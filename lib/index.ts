import { Email, EmailServiceOptions, EmailMessage } from './email';
import { default as Notification, NotificationOptions } from './Notification';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
import { Text, TextServiceOptions, TextMessage, TextMessageSchema, TextGateway } from './text';

export { Notification, NotificationOptions };
export { Email, EmailMessage, EmailServiceOptions };
export { Firebase, FirebaseMessage, FirebaseServiceOptions };
export { Text, TextMessage, TextMessageSchema, TextServiceOptions, TextGateway };

export default Notification;
