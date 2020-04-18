import { Controller, Post, Body } from '@nestjs/common';
import { RuleService } from './rule.service';
import { InsertResult } from 'typeorm';
import { Rule } from './entitys/rule.entity';

@Controller('rule')
export class RuleController {
  constructor(private ruleService: RuleService) {}
  @Post('insert')
  insert(@Body() rule: Rule): Promise<InsertResult> {
    return this.ruleService.insert(rule);
  }
}
