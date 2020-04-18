import { Injectable } from '@nestjs/common';
import { Rule } from './entitys/rule.entity';
import { Repository, InsertResult, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private repositoryRule: Repository<Rule>,
  ) {}

  async insert(rule: Rule): Promise<InsertResult> {
    return await this.repositoryRule.insert(rule);
  }

  async findAll(userId: number): Promise<Rule[]> {
    return this.repositoryRule
      .createQueryBuilder('rule')
      .innerJoinAndSelect(
        'rule.ruleGroup',
        'ruleGroup',
        'ruleGroup.id = rule.ruleGroup',
      )
      .where('rule.user = :id', { id: userId })
      .getMany();
  }

  async findRuleByRuleGroup(
    userId: number,
    ruleGroupId: number,
  ): Promise<Rule[]> {
    return this.repositoryRule
      .createQueryBuilder('rule')
      .innerJoinAndSelect(
        'rule.ruleGroup',
        'ruleGroup',
        'ruleGroup.id = :ruleGroupId',
        { ruleGroupId: ruleGroupId },
      )
      .where('rule.user = :userId', { userId: userId })
      .getMany();
  }
}
