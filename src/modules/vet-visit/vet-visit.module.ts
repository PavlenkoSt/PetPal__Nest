import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VetVisitService } from './vet-visit.service';
import { VetVisitController } from './vet-visit.controller';
import { VetVisit, VetVisitSchema } from './schemas/vet-visit.schema';
import { VetVisitRepository } from './vet-visit.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VetVisit.name,
        schema: VetVisitSchema,
      },
    ]),
  ],
  controllers: [VetVisitController],
  providers: [VetVisitService, VetVisitRepository],
})
export class VetVisitModule {}
