import { CreateUserDto } from '../dto/create-user.dto';

export type IUserWithHashedPassword = Omit<CreateUserDto, 'password'> & {
  passwordHash: string;
};
