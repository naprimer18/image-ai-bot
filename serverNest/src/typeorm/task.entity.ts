import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('task')
export class Task {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
