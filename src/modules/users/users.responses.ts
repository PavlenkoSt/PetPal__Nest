import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateUserDto } from './dto/create-user.dto';
import { petInResponse } from '../pets/pets.responses';

export interface IUserResponse extends Omit<CreateUserDto, 'password'> {
  _id: string;
}

export const userInResponse: IUserResponse = {
  _id: 'string',
  login: 'string',
  firstName: 'string',
  lastName: 'string',
};

export const UsersResponses = {
  userWithPets: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: { ...userInResponse, pets: [petInResponse] },
    },
  }),
};
