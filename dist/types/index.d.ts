import { Email, EmailServiceOptions, EmailMessage } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
export { Email, EmailMessage, EmailServiceOptions };
export { Firebase, FirebaseMessage, FirebaseServiceOptions };
import { default as Notification, NotificationOptions } from './Notification';
export { Notification, NotificationOptions };
declare const _default: {
    Notification: typeof Notification;
    Email: typeof Email;
    Firebase: typeof Firebase;
};
export default _default;
