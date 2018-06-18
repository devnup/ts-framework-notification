import { TextMessageSchema } from "../TextMessage";
import { BaseTextGateway } from "./BaseTextGateway";

export interface TwilioGatewayOptions {
  from: string;
  accountSid: string;
  authToken: string;
}

export default class TwilioTextGateway implements BaseTextGateway {
  client: any;

  constructor(protected options: TwilioGatewayOptions) {
    this.init();
  }

  protected async init() {
    const Twilio = await import('twilio');
    const { accountSid, authToken } = this.options;
    this.client = Twilio(accountSid, authToken);
  }

  public send(message: TextMessageSchema) {
    return this.client.messages.create({
      body: message.text,
      from: message.from || this.options.from,
      to: message.to,
    });
  }
}