import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { Next } from '@nestjs/common';

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    try {
      const hashed = await bcrypt.hash(event.entity.password, 10);
      event.entity.password = hashed;
      Next();
    } catch (err) {
      console.log('error hashed', err);
    }
  }
}
