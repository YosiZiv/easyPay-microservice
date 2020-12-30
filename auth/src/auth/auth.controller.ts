import { Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/shared/users.service';
import { UserRegisterDto } from 'src/users/dtos/user-register.dto';
import { userLoginDto } from 'src/users/dtos/user-login-dto';
@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}
  @Post('login')
  async login(loginDto: userLoginDto) {
    return await this.userService.findOne(loginDto);
  }

  @Post('register')
  async register(registerDto: UserRegisterDto) {
    return await this.userService.create(registerDto);
  }
}
