import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';
import { ICurrentUser, User } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('current')
  getProfile(@User() user: ICurrentUser) {
    return this.usersService.getProfile(String(user.id));
  }

  @Get(':id')
  getProfileById(@Param() id: string) {
    return this.usersService.getProfile(id);
  }
}
