import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Rule } from 'src/modules/rule/entitys/rule.entity';
import { User } from 'src/modules/user/entitys/user.entity';

@Entity()
export class RuleGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(
    type => User,
    user => user.rule,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @OneToMany(
    type => Rule,
    rule => rule.ruleGroup,
  )
  rule: Rule;
}
