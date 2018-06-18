import { TransportTypes } from './../types';
import { BaseMessage, BaseMessageSchema } from "../base";

export interface TextMessageSchema extends BaseMessageSchema {
  from?: string;
  to: string | string[];
  text: string;
}

export default class TextMessage extends BaseMessage implements TextMessageSchema {
  _id?: string;
  _type: string;
  from?: string;
  to: string | string[];
  text: string;

  constructor(data: TextMessageSchema) {
    super({ ...data, type: TransportTypes.TEXT });
    this.from = data.from;
    this.to = data.to;
    this.text = data.text;
  }
}