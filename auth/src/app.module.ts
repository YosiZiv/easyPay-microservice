import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { config } from './orm.config';
import { UserModule } from './user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot({ ...config }), UserModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
