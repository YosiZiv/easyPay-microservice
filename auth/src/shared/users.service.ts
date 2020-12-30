import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { userLoginDto } from '../users/dtos/user-login-dto';
import { UserRegisterDto } from '../users/dtos/user-register.dto';
import { User } from '../users/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async createMany(users) {
    await this.connection.transaction(async (manager) => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }
  async create(userRegisterDto: UserRegisterDto) {
    try {
      const { email } = userRegisterDto;
      const user = await this.usersRepository.findOne({ email });
      if (user) {
        throw new HttpException('user all ready exist', HttpStatus.BAD_REQUEST);
      }
      return this.usersRepository.save(userRegisterDto);
    } catch (err) {
      console.log(err);
    }
  }
  async findOne(userLoginDto: userLoginDto): Promise<User> {
    const { email, password } = userLoginDto;
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      // TODO costume error massage class
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
