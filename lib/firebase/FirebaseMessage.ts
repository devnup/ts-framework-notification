import { TransportTypes } from './../types';

import BaseMessage, { BaseMessageSchema } from "../base/BaseMessage";

export interface FirebaseMessageSchema extends BaseMessageSchema {
  // Firebase Device Token
  registrationToken: string;

  // Multi-platform attributes
  sound?: string
  title?: string
  titleLocArgs?: string
  titleLocKey?: string
  body?: string
  bodyLocArgs?: string
  bodyLocKey?: string
  clickAction?: string

  // Android specific attributes
  tag?: string
  color?: string
  icon?: string

  // iOS specific attributes
  badge?: string
}

/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.NotificationMessagePayload
 */
export default class FirebaseMessage extends BaseMessage implements FirebaseMessageSchema {
  _id: string;
  _type: string;
  registrationToken: string;

  // Multi-platform attributes
  sound?: string
  title?: string
  titleLocArgs?: string
  titleLocKey?: string
  body?: string
  bodyLocArgs?: string
  bodyLocKey?: string
  clickAction?: string

  // Android specific attributes
  tag?: string
  color?: string
  icon?: string

  // iOS specific attributes
  badge?: string

  constructor(data: FirebaseMessageSchema) {
    super({ ...data, type: TransportTypes.FIREBASE });

    this.registrationToken = data.registrationToken;

    this.sound = data.sound;
    this.title = data.title;
    this.titleLocArgs = data.titleLocArgs;
    this.titleLocKey = data.titleLocKey;
    this.body = data.body;
    this.bodyLocArgs = data.bodyLocArgs;
    this.bodyLocKey = data.bodyLocKey;
    this.clickAction = data.clickAction;

    this.tag = data.tag;
    this.color = data.color;
    this.icon = data.icon;

    this.badge = data.badge;
  }
}