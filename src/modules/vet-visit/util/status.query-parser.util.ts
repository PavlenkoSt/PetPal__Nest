import { FilterQuery } from 'mongoose';

import { VetVisitStatusQueryEnum } from '../interfaces/VetVisitStatusQueryEnum';
import { VetVisit } from '../schemas/vet-visit.schema';

export const statusQueryParserUtil = (status: VetVisitStatusQueryEnum) => {
  const query: FilterQuery<VetVisit> = {};

  switch (status) {
    case VetVisitStatusQueryEnum.ALL:
      break;

    case VetVisitStatusQueryEnum.ACTIVE:
      query.isDone = false;
      query.dateTime = {
        $gte: new Date().toISOString(),
      };
      break;

    case VetVisitStatusQueryEnum.DONE:
      query.isDone = true;
      break;

    case VetVisitStatusQueryEnum.MISSED:
      query.isDone = false;
      query.dateTime = {
        $lt: new Date().toISOString(),
      };
      break;

    default:
      break;
  }

  return query;
};
