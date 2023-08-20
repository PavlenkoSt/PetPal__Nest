import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type ScheduledVetVisitDocument = HydratedDocument<ScheduledVetVisit>;

@Schema()
export class ScheduledVetVisit {
  @Prop({ required: true, type: String })
  dateTime: string;

  @Prop({ required: false, type: String, default: '' })
  description: string;

  @Prop({ required: true, type: String })
  clinicName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Pet' })
  petId: string;
}

export const ScheduledVetVisitSchema =
  SchemaFactory.createForClass(ScheduledVetVisit);
