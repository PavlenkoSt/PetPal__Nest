import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type AlergyDocument = HydratedDocument<Alergy>;

@Schema()
export class Alergy {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    ref: 'Pet',
    type: NativeSchema.Types.ObjectId,
  })
  petId: string;
}

export const AlergySchema = SchemaFactory.createForClass(Alergy);
