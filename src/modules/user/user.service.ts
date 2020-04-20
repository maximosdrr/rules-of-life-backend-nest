import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from './entitys/user.entity';
import { UserUpdateData } from './interfaces/user.update.data';
import { PasswordUpdateData } from './interfaces/password.update.data';

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
    const token: string = sign({ id }, secret, { expiresIn: 3000000 });

    return { auth: true, token: token };
  }

  async update(userId: number, user: UserUpdateData): Promise<User> {
    const userToUpdate: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (userToUpdate) {
      userToUpdate.name = user.name;
      userToUpdate.birthday = user.birthday;
      return this.userRepository.save(userToUpdate);
    }
    return;
  }

  async delete(userId: number): Promise<DeleteResult> {
    return this.userRepository
      .createQueryBuilder('user')
      .delete()
      .where('id = :id', { id: userId })
      .execute();
  }

  async changePassword(
    userId: number,
    passwordUpdateData: PasswordUpdateData,
  ): Promise<User> {
    const userToUpdate: User = await this.userRepository.findOne({
      where: { id: userId, password: passwordUpdateData.oldPassword },
    });

    if (userToUpdate) {
      userToUpdate.password = passwordUpdateData.newPassword;
      return this.userRepository.save(userToUpdate);
    }
    return;
  }
}
