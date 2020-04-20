import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleGroup } from './entitys/rule-group.entity';
import { Repository, InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { RuleGroupInterface } from './interfaces/rule-group.interface';
import { RuleGroupUpdateData } from './interfaces/rule-group.update.data.interface';

@Injectable()
export class RuleGroupService {
  constructor(
    @InjectRepository(RuleGroup)
    private ruleGroupRepository: Repository<RuleGroup>,
  ) {}

  async insert(ruleGroup: RuleGroupInterface): Promise<InsertResult> {
    return await this.ruleGroupRepository.insert(ruleGroup);
  }

  async findAll(id: string): Promise<RuleGroup[]> {
    return await this.ruleGroupRepository.find({
      where: { user: id },
    });
  }

  async findOne(userId: number, ruleGroupId: number): Promise<RuleGroup> {
    return await this.ruleGroupRepository.findOne({
      where: {
        id: ruleGroupId,
        user: userId,
      },
    });
  }

  async delete(userId: number, ruleGroupId: number): Promise<DeleteResult> {
    return await this.ruleGroupRepository
      .createQueryBuilder('rule_group')
      .delete()
      .where('user = :userId and id = :id', { userId: userId, id: ruleGroupId })
      .execute();
  }

  async update(
    userId: number,
    ruleGroup: RuleGroupUpdateData,
  ): Promise<RuleGroup> {
    const ruleGroupToUpdate: RuleGroup = await this.ruleGroupRepository.findOne(
      {
        where: {
          id: ruleGroup.id,
          userId: userId,
        },
      },
    );
    if (ruleGroupToUpdate) {
      ruleGroupToUpdate.name = ruleGroup.name;
      ruleGroupToUpdate.description = ruleGroup.description;
      return this.ruleGroupRepository.save(ruleGroupToUpdate);
    }
    return;
  }
}
