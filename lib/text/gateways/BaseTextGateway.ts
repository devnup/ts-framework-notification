import { TextMessageSchema } from "../TextMessage";

export enum TextGateway {
  TWILIO = 'twilio',
  CUSTOM = 'custom',
}

export interface BaseTextGateway {
  send(text: TextMessageSchema): Promise<any>;
}
