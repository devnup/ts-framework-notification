import { Email, EmailServiceOptions, EmailMessage } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';

export { Email, EmailMessage, EmailServiceOptions };
export { Firebase, FirebaseMessage, FirebaseServiceOptions };

import { default as Notification, NotificationOptions } from './Notification';

export { Notification, NotificationOptions };

export default { Notification, Email, Firebase };