import * as FirebaseSDK from 'firebase-admin';
import { FirebaseMessageSchema } from './FirebaseMessage';
import { BaseNotificationService, BaseNotificationServiceOptions } from '../base';
export interface FirebaseServiceOptions extends BaseNotificationServiceOptions {
    serviceAccount?: FirebaseSDK.ServiceAccount;
    databaseURL?: string;
    debug?: boolean;
}
/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.MessagingOptions
 */
export interface FirebaseTransportOptions {
    priority: 'normal' | 'high';
    timeToLive: number;
}
export default class FirebaseService extends BaseNotificationService {
    sdk: FirebaseSDK.app.App;
    options: FirebaseServiceOptions;
    constructor(options: FirebaseServiceOptions);
    send(message: FirebaseMessageSchema, options?: FirebaseTransportOptions): Promise<FirebaseSDK.messaging.MessagingDevicesResponse>;
}
