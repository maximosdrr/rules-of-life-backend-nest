import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleGroup } from './entitys/rule-group.entity';
import { RuleGroupService } from './rule-group.service';
import { RuleGroupController } from './rule-group.controller';
import { DecodeJwt } from 'src/middlewares/decode.jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RuleGroup])],
  controllers: [RuleGroupController],
  providers: [RuleGroupService],
})
export class RuleGroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeJwt).forRoutes('rule-group');
  }
}
