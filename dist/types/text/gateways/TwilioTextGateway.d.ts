import { TextMessageSchema } from "../TextMessage";
import { BaseTextGateway } from "./BaseTextGateway";
export interface TwilioGatewayOptions {
    from: string;
    accountSid: string;
    authToken: string;
}
export default class TwilioTextGateway implements BaseTextGateway {
    protected options: TwilioGatewayOptions;
    client: any;
    constructor(options: TwilioGatewayOptions);
    protected init(): Promise<void>;
    send(message: TextMessageSchema): any;
}
