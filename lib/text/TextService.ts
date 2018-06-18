import { Logger } from 'ts-framework';
import { BaseNotificationServiceOptions, BaseNotificationService } from '../base';
import { TextMessageSchema } from './TextMessage';
import { TextGateway, BaseTextGateway } from './gateways/BaseTextGateway';
import TwilioGateway from './gateways/TwilioTextGateway';

export interface TextServiceOptions extends BaseNotificationServiceOptions {
  from?: string;
  gateway: TextGateway;
  gatewayOptions?: any;
}

export default class TextService extends BaseNotificationService {
  protected options: TextServiceOptions;
  protected gatewayInstance?: BaseTextGateway;

  constructor(options: TextServiceOptions) {
    super('TextService', options);
    this.initGateway().catch(exception => Logger.error(exception));
  }

  /**
   * Handles built-in gateway support initialization.
   */
  protected async initGateway() {
    // Handles twilio dynamic initialization
    if (this.options.gateway === TextGateway.TWILIO) {
      this.gatewayInstance = new TwilioGateway({
        from: this.options.from,
        ...this.options.gatewayOptions,
      });
    }
  }

  /**
   * Sends an email message.
   * 
   * @param message The message options
   */
  public async send(message: TextMessageSchema) {
    return this.gatewayInstance.send(message);
  }
}