import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RuleService } from './rule.service';
import { InsertResult, SelectQueryBuilder } from 'typeorm';
import { Rule } from './entitys/rule.entity';

@Controller('rule')
export class RuleController {
  constructor(private ruleService: RuleService) {}
  @Post('insert')
  insert(@Body() rule: Rule): Promise<InsertResult> {
    return this.ruleService.insert(rule);
  }

  @Get('findAll')
  findAll(@Query('userId') userId: number): Promise<Rule[]> {
    return this.ruleService.findAll(userId);
  }

  @Get('findRuleByRuleGroup')
  findRuleByRuleGroup(
    @Query('userId') userId: number,
    @Query('ruleGroupId') ruleGroupId: number,
  ) {
    return this.ruleService.findRuleByRuleGroup(userId, ruleGroupId);
  }
}
