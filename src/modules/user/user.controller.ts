import { Controller, Post, Body } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { UserService } from './user.service';
import { Login } from './interfaces/login.interface';
import { User } from './entitys/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('insert')
  insert(@Body() user: User): Promise<InsertResult> {
    return this.userService.insert(user);
  }

  @Post('login')
  async login(@Body() credentials: Login): Promise<object> {
    const user: User = await this.userService.getUser(
      credentials.username,
      credentials.password,
    );
    if (user) return this.userService.getToken(user);
    return { auth: false, token: null };
  }
}
