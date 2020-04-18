import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async insert(user: User): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }

  async getUser(username: string, password: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(`username = :username and password = :password`, {
        username: username,
        password: password,
      })
      .getOne();
  }

  async getToken(user: User): Promise<object> {
    const id: number = user.id;
    const secret: string = process.env.SECRET;
    const token: string = sign({ id }, secret, { expiresIn: 300 });

    return { auth: true, token: token };
  }
}
