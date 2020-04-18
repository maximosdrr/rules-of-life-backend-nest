import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
