import { Injectable } from '@nestjs/common';
import { Rule } from './entitys/rule.entity';
import { Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private repositoryRule: Repository<Rule>,
  ) {}

  async insert(rule: Rule): Promise<InsertResult> {
    return await this.repositoryRule.insert(rule);
  }
}
