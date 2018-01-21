export interface BaseMessageSchema {
    _id?: string;
    _type?: string;
}
export default abstract class BaseMessage {
    _id?: string;
    _type: string;
    constructor(data: any);
}
