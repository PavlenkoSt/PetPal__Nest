import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicationDocument = HydratedDocument<Medication>;

@Schema()
export class Medication {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);
