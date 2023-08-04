import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ErrorLogDocument = HydratedDocument<ErrorLog>;

@Schema()
export class ErrorLog {
  @Prop({ required: true })
  dateTime: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  stack: string;

  @Prop({ required: true })
  body: string;
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
