import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { RuleGroupService } from './rule-group.service';
import { RuleGroupInterface } from './interfaces/rule-group.interface';
import { InsertResult } from 'typeorm';
import { RuleGroup } from './entitys/rule-group.entity';

@Controller('rule-group')
export class RuleGroupController {
  constructor(private ruleGroupService: RuleGroupService) {}
  @Post('insert')
  insert(@Body() ruleGroup: RuleGroupInterface): Promise<InsertResult> {
    return this.ruleGroupService.insert(ruleGroup);
  }

  @Get('findAll')
  findAll(@Query() query): Promise<RuleGroup[]> {
    const { id } = query;
    return this.ruleGroupService.findAll(id);
  }
}
