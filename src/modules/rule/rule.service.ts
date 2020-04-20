import { Injectable } from '@nestjs/common';
import { Rule } from './entitys/rule.entity';
import { Repository, InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleUpdateData } from './interfaces/rule.update.data.interface';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private repositoryRule: Repository<Rule>,
  ) {}

  async insert(rule: Rule): Promise<InsertResult> {
    return await this.repositoryRule.insert(rule);
  }

  async findOne(userId: number, id: number): Promise<Rule> {
    return this.repositoryRule.findOne({
      where: {
        user: userId,
        id: id,
      },
    });
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

  async deleteRule(userId: number, ruleId: number): Promise<DeleteResult> {
    return await this.repositoryRule
      .createQueryBuilder('rule')
      .delete()
      .where('rule.userId = :userId AND rule.id = :id', {
        userId: userId,
        id: ruleId,
      })
      .execute();
  }

  async updateRule(userId: number, rule: RuleUpdateData): Promise<Rule> {
    const ruleToUpdate: Rule = await this.repositoryRule.findOne({
      where: {
        user: userId,
        id: rule.id,
      },
    });

    if (ruleToUpdate) {
      ruleToUpdate.title = rule.title;
      ruleToUpdate.description = rule.description;
      return await this.repositoryRule.save(ruleToUpdate);
    }

    return;
  }
}
