import * as uuid from 'uuid';

export interface BaseMessageSchema {
  _id?: string;
  _type?: string;
}

export default abstract class BaseMessage {
  _id: string;
  _type: string;

  constructor(data: any) {
    this._id = data._id || data.id || uuid.v4();
    this._type = data._type || data.type;
  }
}