import { TransportTypes } from './../types';
import { BaseMessage, BaseMessageSchema } from "../base";

export interface FirebaseMessageSchema extends BaseMessageSchema {
  // Firebase Device Token
  registrationToken: string;

  // Multi-platform attributes
  body?: string;
  sound?: string;
  title?: string;
  bodyLocKey?: string;
  bodyLocArgs?: string;
  clickAction?: string;
  titleLocKey?: string;
  titleLocArgs?: string;

  // Android specific attributes
  tag?: string
  color?: string
  icon?: string

  // iOS specific attributes
  badge?: string

  // Other attributes
  [key: string]: string | undefined;
}

/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.NotificationMessagePayload
 */
export default class FirebaseMessage extends BaseMessage implements FirebaseMessageSchema {
  _id: string;
  _type: string;
  registrationToken: string;

  // Multi-platform attributes
  body?: string;
  sound?: string;
  title?: string;
  bodyLocKey?: string;
  bodyLocArgs?: string;
  clickAction?: string;
  titleLocKey?: string;
  titleLocArgs?: string;

  // Android specific attributes
  tag?: string
  color?: string
  icon?: string

  // iOS specific attributes
  badge?: string

  // Other attributes
  [key: string]: string | undefined;

  constructor(data: FirebaseMessageSchema) {
    super({ ...data, type: TransportTypes.FIREBASE });
    this.registrationToken = data.registrationToken;

    // Multi-platform attributes
    if (data.sound) {
      this.sound = data.sound;
    }
    if (data.title) {
      this.title = data.title;
    }
    if (data.titleLocArgs) {
      this.titleLocArgs = data.titleLocArgs;
    }
    if (data.titleLocKey) {
      this.titleLocKey = data.titleLocKey;
    }
    if (data.body) {
      this.body = data.body;
    }
    if (data.bodyLocArgs) {
      this.bodyLocArgs = data.bodyLocArgs;
    }
    if (data.bodyLocKey) {
      this.bodyLocKey = data.bodyLocKey;
    }
    if (data.clickAction) {
      this.clickAction = data.clickAction;
    }

    // Android specific attributes
    if (data.tag) {
      this.tag = data.tag;
    }
    if (data.color) {
      this.color = data.color;
    }
    if (data.icon) {
      this.icon = data.icon;
    }

    // iOS specific attributes
    if (data.badge) {
      this.badge = data.badge;
    }

    // Put additional values in payload
    for (let k in data) {
      if (data.hasOwnProperty(k) && this[k] === undefined) {
        this[k] = data[k];
      }
    }
  }
}
