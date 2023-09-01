import { Schema } from 'mongoose';

export interface ITokenPayload {
  username: string;
  sub: Schema.Types.ObjectId;
}
