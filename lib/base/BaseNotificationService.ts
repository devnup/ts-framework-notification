import { TransportTypes } from './../types';
import { BaseMessageSchema } from './BaseMessage';
import BaseService, { BaseServiceOptions } from "./BaseService";

export interface BaseNotificationServiceOptions extends BaseServiceOptions {
}

export default abstract class BaseNotificationService extends BaseService {
  /**
   * The notification service options.
   */
  protected readonly options: BaseNotificationServiceOptions;

  /**
   * Instantiates a new Notification service.
   * 
   * @param name The service name for verbose logging
   * @param options The notification service options
   */
  constructor(name: string, options: BaseNotificationServiceOptions) {
    super(name, options);
  }

  /**
   * Sends a new message through the notification service.
   * 
   * @param data The data to be sent through the notification service
   * @param options The options to be used in the transport
   */
  public abstract send(message: BaseMessageSchema, options?: any);
}