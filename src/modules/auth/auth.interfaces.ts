import { Schema } from 'mongoose';

export interface ITokenPayload {
  username: string;
  sub: Schema.Types.ObjectId;
}

export interface IUser {
  id: Schema.Types.ObjectId;
  login: string;
  firstName: string;
  lastName: string;
  pets: string[];
}
