import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rule } from 'src/modules/rule/entitys/rule.entity';

@Entity()
export class RuleGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  user: number;

  @OneToMany(
    type => Rule,
    rule => rule.ruleGroup,
  )
  rule: Rule;
}
