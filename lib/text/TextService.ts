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

    if (!this.options.gateway) {
      throw new Error('No gateway supplied for the Text messages service');
    }

    this.initGateway().catch(exception => {
      Logger.error(exception)
      this.gatewayInstance = undefined;
    });
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
    } else if (this.options.gateway === TextGateway.DEBUG) {
      // Handles a debug gateway (console)
      this.gatewayInstance = {
        isReady: true,
        async send(msg) {
          Logger.warn('TextService: Sending SMS as a warning in debug mode', JSON.stringify(msg, null, 2));
        }
      }
    }
  }

  /**
   * Checks if the service is ready for sending text messages.
   */
  public async isReady(): Promise<boolean> {
    return !!(this.gatewayInstance && this.gatewayInstance.isReady);
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