import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rule } from 'src/modules/rule/entitys/rule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  birthday: string;

  @OneToMany(
    type => Rule,
    rule => rule.user,
  )
  rule: Rule;
}
