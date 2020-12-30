import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { config } from './orm.config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [TypeOrmModule.forRoot({ ...config, entities: [User] }), AuthModule],
})
export class AppModule {}
