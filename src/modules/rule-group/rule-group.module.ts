import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleGroup } from './entitys/rule-group.entity';
import { RuleGroupService } from './rule-group.service';
import { RuleGroupController } from './rule-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RuleGroup])],
  controllers: [RuleGroupController],
  providers: [RuleGroupService],
})
export class RuleGroupModule {}
