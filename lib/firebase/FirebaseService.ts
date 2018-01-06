import * as FirebaseSDK from 'firebase-admin';
import { Logger } from 'ts-framework';
import { BaseMessageSchema } from './../base/BaseMessage';
import FirebaseMessage, { FirebaseMessageSchema } from './FirebaseMessage';
import BaseNotificationService, { BaseNotificationServiceOptions } from '../base/BaseNotificationService';

export interface FirebaseServiceOptions extends BaseNotificationServiceOptions {
  serviceAccount?: FirebaseSDK.ServiceAccount
  databaseURL?: string
  debug?: boolean
}

/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.MessagingOptions
 */
export interface FirebaseTransportOptions {
  priority: 'normal' | 'high'
  timeToLive: number
}

export default class FirebaseService extends BaseNotificationService {
  sdk: FirebaseSDK.app.App
  options: FirebaseServiceOptions

  constructor(options: FirebaseServiceOptions) {
    super('FirebaseService', options);

    // Initialize the Firebase Admin SDK
    if (options.serviceAccount && options.databaseURL) {
      this.sdk = FirebaseSDK.initializeApp({
        databaseURL: options.databaseURL,
        credential: FirebaseSDK.credential.cert(options.serviceAccount),
      });
    } else {
      // No transporter available, prepare message for warning or crash
      const message = 'FirebaseService: The Google Service Account is not available.';

      if (!options.debug) {
        // No debug mode, crash the service
        throw new Error(message);

      } else if (options.verbose) {
        // In debug mode we send all messages to the console
        Logger.warn(`${message} All messages will be sent to the console as warnings.`);
      }
    }
  }

  public send(message: FirebaseMessageSchema, options?: FirebaseTransportOptions) {
    const data = message instanceof FirebaseMessage ? message : new FirebaseMessage(message);

    if (this.sdk) {
      // Send a message to the device corresponding to the provided
      // registration token with the provided options.
      const { registrationToken, ...payload } = data;
      return this.sdk.messaging().sendToDevice(registrationToken, { notification: payload }, options)
    } else {
      const errorMessage = 'FirebaseService is not ready, the Google Service Account may be invalid or unavailable';

      if (this.options.debug) {
        // Logs the notification body in the console as a warning
        Logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
      } else {
        // Crash the service, notification could not be sent
        throw new Error(errorMessage);
      }
    }
  }

}