import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/modules/user/entitys/user.entity';
import { RuleGroup } from 'src/modules/rule-group/entitys/rule-group.entity';

@Entity()
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    type => User,
    user => user.rule,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @ManyToOne(
    type => RuleGroup,
    ruleGroup => ruleGroup.rule,
    { onDelete: 'CASCADE' },
  )
  ruleGroup: RuleGroup;

  rule_ruleGroupId: RuleGroup;
}
