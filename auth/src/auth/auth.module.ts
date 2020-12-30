import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthSubscriber } from './auth.subscribers';
@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthSubscriber],
})
export class AuthModule {}
