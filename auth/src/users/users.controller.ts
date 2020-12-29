import { Controller, Post } from '@nestjs/common';
import { userLoginDto } from './dtos/user-login-dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users/createMany')
  async createMany() {
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
    return await this.usersService.createMany(testUsers);
  }
  @Post('users/login')
  async login(userLoginDto: userLoginDto) {
    return await this.usersService.findOne(userLoginDto);
  }
  @Post('users/register')
  async register(userRegisterDto: UserRegisterDto) {
    return await this.usersService.create(userRegisterDto);
  }
}
