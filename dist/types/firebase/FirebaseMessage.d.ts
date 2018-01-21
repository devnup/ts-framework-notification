import { BaseMessage, BaseMessageSchema } from "../base";
export interface FirebaseMessageSchema extends BaseMessageSchema {
    registrationToken: string;
    body?: string;
    sound?: string;
    title?: string;
    bodyLocKey?: string;
    bodyLocArgs?: string;
    clickAction?: string;
    titleLocKey?: string;
    titleLocArgs?: string;
    tag?: string;
    color?: string;
    icon?: string;
    badge?: string;
    [key: string]: string | undefined;
}
/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.NotificationMessagePayload
 */
export default class FirebaseMessage extends BaseMessage implements FirebaseMessageSchema {
    _id: string;
    _type: string;
    registrationToken: string;
    body?: string;
    sound?: string;
    title?: string;
    bodyLocKey?: string;
    bodyLocArgs?: string;
    clickAction?: string;
    titleLocKey?: string;
    titleLocArgs?: string;
    tag?: string;
    color?: string;
    icon?: string;
    badge?: string;
    [key: string]: string | undefined;
    constructor(data: FirebaseMessageSchema);
}
