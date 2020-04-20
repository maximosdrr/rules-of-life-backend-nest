import {
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { RuleService } from './rule.service';
import { InsertResult, DeleteResult } from 'typeorm';
import { Rule } from './entitys/rule.entity';
import { JwtGuards } from 'src/auth/jwt.guards';
import { RuleUpdateData } from './interfaces/rule.update.data.interface';

@Controller('rule')
@UseGuards(JwtGuards)
export class RuleController {
  constructor(private ruleService: RuleService) {}
  @Post('insert')
  insert(@Req() request): Promise<InsertResult> {
    const rule: Rule = request.body;
    rule.user = request.headers['user-id'];

    return this.ruleService.insert(rule);
  }

  @Get('findAll')
  findAll(@Req() request): Promise<Rule[]> {
    const userId = request.headers['user-id'];
    return this.ruleService.findAll(userId);
  }

  @Get('findOne')
  findOne(@Req() request, @Query('ruleId') ruleId): Promise<Rule> {
    const userId = request.headers['user-id'];
    return this.ruleService.findOne(userId, ruleId);
  }

  @Get('findRuleByRuleGroup')
  findRuleByRuleGroup(
    @Req() request,
    @Query('ruleGroupId') ruleGroupId,
  ): Promise<Rule[]> {
    const userId = request.headers['user-id'];
    return this.ruleService.findRuleByRuleGroup(userId, ruleGroupId);
  }

  @Delete('delete')
  deleteRule(
    @Req() request,
    @Query('ruleId') ruleId: number,
  ): Promise<DeleteResult> {
    const userId = request.headers['user-id'];

    return this.ruleService.deleteRule(userId, ruleId);
  }

  @Put('update')
  updateRule(@Req() request) {
    const userId = request.headers['user-id'];
    const ruleData: RuleUpdateData = request.body;
    return this.ruleService.updateRule(userId, ruleData);
  }
}
