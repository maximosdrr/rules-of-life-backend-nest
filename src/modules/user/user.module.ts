import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyJwtMiddleware } from '../../middlewares/verifyJwt.middleware';
import { User } from './entitys/user.entity';
import { RuleGroup } from '../rule-group/entitys/rule-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, RuleGroup],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJwtMiddleware).forRoutes('user/teste');
  }
}
