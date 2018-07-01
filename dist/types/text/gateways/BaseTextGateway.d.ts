import { TextMessageSchema } from "../TextMessage";
export declare enum TextGateway {
    TWILIO = "twilio",
    CUSTOM = "custom",
    DEBUG = "debug",
}
export interface BaseTextGateway {
    isReady: boolean;
    send(text: TextMessageSchema): Promise<any>;
}
