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
    this.sound = data.sound;
    this.title = data.title;
    this.titleLocArgs = data.titleLocArgs;
    this.titleLocKey = data.titleLocKey;
    this.body = data.body;
    this.bodyLocArgs = data.bodyLocArgs;
    this.bodyLocKey = data.bodyLocKey;
    this.clickAction = data.clickAction;

    // Android specific attributes
    this.tag = data.tag;
    this.color = data.color;
    this.icon = data.icon;

    // iOS specific attributes
    this.badge = data.badge;

    // Put additional values in payload
    for (let k in data) {
      if (data.hasOwnProperty(k) && this[k] === undefined) {
        this[k] = data[k];
      }
    }
  }
}