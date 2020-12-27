import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users/createMany')
  createMany() {
    const testUsers = [
      {
        username: 'test',
        email: 'test@test.com',
        password: '123456',
      },
      {
        username: 'test2',
        email: 'test2@test.com',
        password: '123456',
      },
    ];
    this.usersService.findOne('1');
    return 'test';
  }
}
