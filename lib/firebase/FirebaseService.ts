import * as FirebaseSDK from 'firebase-admin';
import { BaseMessageSchema } from './../base/BaseMessage';
import FirebaseMessage, { FirebaseMessageSchema } from './FirebaseMessage';
import BaseNotificationService, { BaseNotificationServiceOptions } from '../base/BaseNotificationService';

export interface FirebaseServiceOptions extends BaseNotificationServiceOptions {
  serviceAccount: FirebaseSDK.ServiceAccount
  databaseURL: string
  sdk?: FirebaseSDK.app.App
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

  constructor(options: FirebaseServiceOptions) {
    super('FirebaseService', options);

    // Initialize the Firebase Admin SDK
    this.sdk = options.sdk || FirebaseSDK.initializeApp({
      databaseURL: options.databaseURL,
      credential: FirebaseSDK.credential.cert(options.serviceAccount),
    });
  }

  public send(data: FirebaseMessageSchema, options?: FirebaseTransportOptions) {
    throw new Error("Method not implemented.");
  }

}