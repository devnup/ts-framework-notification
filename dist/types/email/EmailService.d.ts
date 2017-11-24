/// <reference types="email-templates" />
import * as nodemailer from 'nodemailer';
import * as Template from 'email-templates';
import BaseNotificationService, { BaseNotificationServiceOptions } from '../base/BaseNotificationService';
export interface EmailMessage {
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    cc?: string | string[];
    bcc?: string | string[];
    locals?: any;
    template?: string;
}
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
    };
}
export default class EmailService extends BaseNotificationService {
    protected readonly options: EmailServiceOptions;
    protected readonly transporter?: nodemailer.Transporter;
    protected readonly templateEngine?: Template;
    /**
     * Instantiates a new email service instance.
     *
     * @param options The email service options
     */
    constructor(options: EmailServiceOptions);
    /**
     * Verifies if the SMTP connection is OK.
     */
    isReady(): Promise<boolean>;
    /**
     * Sends an email message.
     *
     * @param options The message options
     */
    send(options: EmailMessage): Promise<any>;
}
