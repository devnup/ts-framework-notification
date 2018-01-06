import { NotificationOptions } from './Notification';
import { Firebase, FirebaseMessageSchema } from './firebase';
import { Email, EmailMessageSchema } from './email';
import { BaseNotificationService, BaseNotificationServiceOptions } from "./base";
import { FirebaseServiceOptions, EmailServiceOptions } from 'index';
export interface NotificationOptions extends BaseNotificationServiceOptions {
    firebase?: FirebaseServiceOptions;
    email?: EmailServiceOptions;
}
export default class Notification extends BaseNotificationService {
    options: NotificationOptions;
    transports: {
        email?: Email;
        firebase?: Firebase;
    };
    constructor(options: NotificationOptions);
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be a Email message or a Firebase message.
     * @param options The options to be sent to the Transporter
     */
    send(message: EmailMessageSchema | FirebaseMessageSchema, options?: any): Promise<any>;
}
