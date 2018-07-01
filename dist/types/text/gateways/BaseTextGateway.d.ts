import { TextMessageSchema } from "../TextMessage";
export declare enum TextGateway {
    TWILIO = "twilio",
    CUSTOM = "custom",
    DEBUG = "debug",
}
export interface BaseTextGateway {
    send(text: TextMessageSchema): Promise<any>;
}
