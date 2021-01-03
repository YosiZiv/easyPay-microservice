import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { UserRegisterDto } from 'src/users/dtos/user-register.dto';
import { UserLoginDto } from 'src/users/dtos/user-login-dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  test() {
    return { auth: 'works' };
  }
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const { userName, email } = await this.userService.findOne(userLoginDto);
    const token = await this.authService.signPayload({ userName, email });
    return { userName, email, token };
  }

  @Post('register')
  async register(@Body() registerDto: UserRegisterDto) {
    const { userName, email } = await this.userService.create(registerDto);
    const token = await this.authService.signPayload({ userName, email });
    return { userName, email, token };
  }
}
