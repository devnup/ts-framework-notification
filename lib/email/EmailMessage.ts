import BaseMessage, { BaseMessageSchema } from "../base/BaseMessage";

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

  static TYPE_EMAIL = 'email';

  constructor(data: any) {
    super({ ...data, type: EmailMessage.TYPE_EMAIL });
    this.from = data.from;
    this.to = data.to;
    this.subject = data.subject;
    this.text = data.text;
    this.html = data.html;
    this.cc = data.cc;
    this.bcc = data.bdd;
    this.locals = data.locals;
    this.template = data.template;
  }
}