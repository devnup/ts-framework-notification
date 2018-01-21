import { BaseMessage, BaseMessageSchema } from "../base";
export interface EmailMessageSchema extends BaseMessageSchema {
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
export default class EmailMessage extends BaseMessage implements EmailMessageSchema {
    _id: string;
    _type: string;
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    cc?: string | string[];
    bcc?: string | string[];
    locals?: any;
    template?: string;
    constructor(data: EmailMessageSchema);
}
