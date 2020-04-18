import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleGroup } from './entitys/rule-group.entity';
import { Repository, InsertResult } from 'typeorm';
import { RuleGroupInterface } from './interfaces/rule-group.interface';

@Injectable()
export class RuleGroupService {
  constructor(
    @InjectRepository(RuleGroup) private ruleRepository: Repository<RuleGroup>,
  ) {}

  async insert(ruleGroup: RuleGroupInterface): Promise<InsertResult> {
    return await this.ruleRepository.insert(ruleGroup);
  }

  async findAll(id: string): Promise<RuleGroup[]> {
    return await this.ruleRepository.find({
      where: { user: id },
    });
  }
}
