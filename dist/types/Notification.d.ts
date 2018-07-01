import { BaseNotificationService, BaseNotificationServiceOptions } from "./base";
import { Text, TextMessage, TextServiceOptions } from './text';
import { Email, EmailMessage, EmailServiceOptions } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
export interface NotificationOptions extends BaseNotificationServiceOptions {
    firebase?: FirebaseServiceOptions;
    email?: EmailServiceOptions;
    text?: TextServiceOptions;
}
export default class Notification extends BaseNotificationService {
    options: NotificationOptions;
    transports: {
        email?: Email;
        firebase?: Firebase;
        text?: Text;
    };
    static EmailMessage: typeof EmailMessage;
    static FirebaseMessage: typeof FirebaseMessage;
    constructor(options: NotificationOptions);
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
     * @param options The options to be sent to the Transporter
     */
    send(message: EmailMessage | FirebaseMessage | TextMessage, options?: any): Promise<any>;
}
