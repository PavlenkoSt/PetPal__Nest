import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { UsersResponses } from './users.responses';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current user' })
  @UsersResponses.userWithPets
  getProfile(@User() user: ICurrentUser) {
    return this.usersService.getProfile(String(user.id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @UsersResponses.userWithPets
  getProfileById(@Param() id: string) {
    return this.usersService.getProfile(id);
  }
}
