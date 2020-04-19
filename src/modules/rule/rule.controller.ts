import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { RuleService } from './rule.service';
import { InsertResult } from 'typeorm';
import { Rule } from './entitys/rule.entity';
import { JwtGuards } from 'src/auth/jwt.guards';

@Controller('rule')
@UseGuards(JwtGuards)
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
