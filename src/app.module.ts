import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RuleModule } from './modules/rule/rule.module';
import { RuleGroupModule } from './modules/rule-group/rule-group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UserModule,
    RuleModule,
    RuleGroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
