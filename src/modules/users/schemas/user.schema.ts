import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    type: [NativeSchema.Types.ObjectId],
    ref: 'Pet',
  })
  pets: [NativeSchema.Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
