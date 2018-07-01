import { BaseNotificationServiceOptions, BaseNotificationService } from '../base';
import { TextMessageSchema } from './TextMessage';
import { TextGateway, BaseTextGateway } from './gateways/BaseTextGateway';
export interface TextServiceOptions extends BaseNotificationServiceOptions {
    from?: string;
    gateway: TextGateway;
    gatewayOptions?: any;
}
export default class TextService extends BaseNotificationService {
    protected options: TextServiceOptions;
    protected gatewayInstance?: BaseTextGateway;
    constructor(options: TextServiceOptions);
    /**
     * Handles built-in gateway support initialization.
     */
    protected initGateway(): Promise<void>;
    /**
     * Checks if the service is ready for sending text messages.
     */
    isReady(): Promise<boolean>;
    /**
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message: TextMessageSchema): Promise<any>;
}
