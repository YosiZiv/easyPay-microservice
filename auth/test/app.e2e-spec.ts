import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from 'src/user/dto';
const app = 'http://localhost:3000';
describe('ROOT', () => {
  it('/auth (GET)', () => {
    return request(app).get('/auth').expect(200).expect('hello world');
  });
});
describe('AUTH', () => {
  it('should create user', () => {
    const data: CreateUserDto = {
      user_name: 'test',
      email: 'testt@test.com',
      password: 'password',
    };
    return request(app)
      .post('/auth/users')
      .set('Accept', 'application/json')
      .send(data)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user_name).toEqual('testt@test.com');
        expect(body.password).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('reject duplicate email on user create', () => {
    const data: CreateUserDto = {
      user_name: 'test',
      email: 'testt@test.com',
      password: 'password',
    };
    return request(app)
      .post('/auth/users')
      .set('Accept', 'application/json')
      .send(data)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exsist');
      })
      .expect(HttpStatus.CREATED);
  });
});
