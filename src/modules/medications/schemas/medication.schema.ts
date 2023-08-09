import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type MedicationDocument = HydratedDocument<Medication>;

@Schema()
export class Medication {
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

export const MedicationSchema = SchemaFactory.createForClass(Medication);
