import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type AlergyDocument = HydratedDocument<Allergy>;

@Schema()
export class Allergy {
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

export const AllergySchema = SchemaFactory.createForClass(Allergy);
