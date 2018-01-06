import { TransportTypes } from './../types';
import { BaseMessage, BaseMessageSchema } from "../base";

export interface EmailMessageSchema extends BaseMessageSchema {
  from?: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  locals?: any;
  template?: string;
}

export default class EmailMessage extends BaseMessage implements EmailMessageSchema {
  _id: string;
  _type: string;
  from?: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  locals?: any;
  template?: string;

  constructor(data: EmailMessageSchema) {
    super({ ...data, type: TransportTypes.EMAIL });
    this.from = data.from;
    this.to = data.to;
    this.subject = data.subject;
    this.text = data.text;
    this.html = data.html;
    this.cc = data.cc;
    this.bcc = data.bcc;
    this.locals = data.locals;
    this.template = data.template;
  }
}