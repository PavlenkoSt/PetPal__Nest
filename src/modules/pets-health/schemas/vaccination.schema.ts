import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VaccinationDocument = HydratedDocument<Vaccination>;

@Schema()
export class Vaccination {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const VaccinationSchema = SchemaFactory.createForClass(Vaccination);
