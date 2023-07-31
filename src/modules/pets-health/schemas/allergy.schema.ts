import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlergyDocument = HydratedDocument<Alergy>;

@Schema()
export class Alergy {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const AlergySchema = SchemaFactory.createForClass(Alergy);
