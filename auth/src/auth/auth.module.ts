import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthSubscriber } from './auth.subscribers';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/jwt-strategy';
@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthSubscriber],
})
export class AuthModule {}
