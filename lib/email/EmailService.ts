import * as path from 'path';
import { Logger } from 'ts-framework';
import * as nodemailer from 'nodemailer';
import * as Template from 'email-templates';
import { TransportTypes } from '../types';
import EmailMessage, { EmailMessageSchema } from './EmailMessage';
import BaseNotificationService, { BaseNotificationServiceOptions } from '../base/BaseNotificationService';

export interface EmailServiceOptions extends BaseNotificationServiceOptions {
  /**
   * The default sender for the emails sent by the service.
   */
  from: string;

  /**
   * E-mails will be sent to console whenever the connectionUrl is not available if debug is "true".
   */
  debug?: boolean;

  /**
   * The SMTP connection URL.
   */
  connectionUrl?: string;

  /**
   * The Nodemailer transporter to be used as the sender engine.
   */
  transporter?: nodemailer.Transporter;

  /**
   * The template engine options, if enabled
   */
  template?: {
    root?: string;
    engine?: string;
    enabled: boolean;
    defaultTemplate?: string;
  }
}

export default class EmailService extends BaseNotificationService {
  protected readonly transporter?: nodemailer.Transporter;
  protected readonly templateEngine?: Template;

  /**
   * Instantiates a new email service instance.
   * 
   * @param options The email service options
   */
  constructor(protected readonly options: EmailServiceOptions) {
    super('EmailService', options);
    if (options.transporter) {
      // Transporter instance was given to the constructor
      this.transporter = options.transporter;
    } else if (options.connectionUrl) {
      // Instantiate a new Transporter based on SMTP connection URL.
      this.transporter = nodemailer.createTransport(options.connectionUrl);
    } else {
      // No transporter available, prepare message for warning or crash
      const message = 'EmailService: The SMTP connectionUrl is not available.';

      if (!options.debug) {
        // No debug mode, crash the service
        throw new Error(message);
      } else if (options.verbose) {
        // In debug mode we send all messages to the console
        Logger.warn(`${message} All messages will be sent to the console as warnings.`);
      }
    }

    this.options.template = { defaultTemplate: 'cerberus', ...this.options.template };

    // If transporter is available, prepare the template engine
    if (this.transporter && this.options.template.enabled) {

      // Instantiate the template engine renderer for sending cool emails
      this.templateEngine = new Template({
        message: { from: options.from },
        transport: this.transporter,
        views: {
          root: this.options.template.root || path.join(__dirname, './templates'),
          options: {
            extension: this.options.template.engine || 'ejs'
          }
        }
      });
    }
  }

  /**
   * Verifies if the SMTP connection is OK.
   */
  public async isReady(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }
    try {
      // If it doesnt throw an error everything is ok.
      await this.transporter.verify();
      return true;
    } catch (exception) {
      Logger.debug(exception);
      return false;
    }
  }

  /**
   * Sends an email message.
   * 
   * @param message The message options
   */
  public async send(message: EmailMessageSchema) {
    const data = message = message instanceof EmailMessage ? message : new EmailMessage(message);
    const isReady = await this.isReady();

    if (isReady && this.templateEngine) {
      // Send email using the current template engine
      return this.templateEngine.send({
        message: data,
        locals: {
          getValue: (value, defaultValue) => value || defaultValue,
          ...data.locals
        },
        template: data.template || this.options.template.defaultTemplate,
      })
    } else if (isReady) {
      // Send simple email using the transporter
      return this.transporter.sendMail(data);
    } else {
      const errorMessage = 'EmailService is not ready, the SMTP connectionUrl may be invalid or unavailable';

      if (this.options.debug) {
        // Logs the email body in the console as a warning
        Logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
      } else {
        // Crash the service, email could not be sent
        throw new Error(errorMessage);
      }
    }
  }
}