import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
