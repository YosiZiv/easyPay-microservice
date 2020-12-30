import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from 'src/shared/users.service';
import { UserRegisterDto } from 'src/users/dtos/user-register.dto';
import { UserLoginDto } from 'src/users/dtos/user-login-dto';
@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto);
    return await this.userService.findOne(userLoginDto);
  }

  @Post('register')
  async register(@Body() registerDto: UserRegisterDto) {
    return await this.userService.create(registerDto);
  }
  @Get('')
  test() {
    console.log('ok');

    return 'hello';
  }
}
