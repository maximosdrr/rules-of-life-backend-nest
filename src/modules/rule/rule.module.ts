import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entitys/rule.entity';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';
import { DecodeJwt } from 'src/middlewares/decode.jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Rule])],
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeJwt).forRoutes('rule');
  }
}
