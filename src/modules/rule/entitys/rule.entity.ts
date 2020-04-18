import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
    user => user.id,
  )
  user: User;

  @ManyToOne(
    type => RuleGroup,
    ruleGroup => ruleGroup.id,
  )
  ruleGroup: RuleGroup[];
}
