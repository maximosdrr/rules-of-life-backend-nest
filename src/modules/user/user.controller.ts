import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { InsertResult, DeleteResult } from 'typeorm';
import { UserService } from './user.service';
import { Login } from './interfaces/login.interface';
import { User } from './entitys/user.entity';
import { JwtGuards } from 'src/auth/jwt.guards';
import { UserUpdateData } from './interfaces/user.update.data';
import { request } from 'http';

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

  @UseGuards(JwtGuards)
  @Put('update')
  async update(@Req() request): Promise<User> {
    const userId = request.headers['user-id'];
    const userUpdateData: UserUpdateData = request.body;
    return this.userService.update(userId, userUpdateData);
  }

  @UseGuards(JwtGuards)
  @Delete('delete')
  async delete(@Req() request): Promise<DeleteResult> {
    const userId = request.headers['user-id'];
    return this.userService.delete(userId);
  }
}
