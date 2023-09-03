import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type ChatDocument = HydratedDocument<RefreshToken>;

@Schema()
export class RefreshToken {
  @Prop({
    required: true,
    type: String,
  })
  token: string;

  @Prop({
    required: true,
    type: NativeSchema.Types.ObjectId,
  })
  userId: NativeSchema.Types.ObjectId;

  @Prop({
    required: true,
    type: Date,
  })
  expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
