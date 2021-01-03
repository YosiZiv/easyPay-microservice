import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../users/dtos/user-login-dto';
import { UserRegisterDto } from '../users/dtos/user-register.dto';
import { User } from '../users/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async createMany(@Body() users) {
    await this.connection.transaction(async (manager) => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }
  async create(@Body() userRegisterDto: UserRegisterDto) {
    try {
      const { email } = userRegisterDto;
      const user = await this.userRepository.findOne({ email });
      if (user) {
        throw new HttpException('user all ready exist', HttpStatus.BAD_REQUEST);
      }
      return this.userRepository.save(userRegisterDto);
    } catch (err) {
      console.log(err);
    }
  }
  async findOne(@Body() userLoginDto: UserLoginDto): Promise<User> {
    const { email, password } = userLoginDto;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      // TODO costume error massage class
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async remove(@Body() id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async findByPayload(payload: any) {
    const { userName } = payload;
    return await this.userRepository.findOne({ userName });
  }
}
