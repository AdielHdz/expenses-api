import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: string;

  @Column()
  description: string;

  @Column({
    type: 'numeric',
  })
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  date: Date;

  @Column({
    length: 50,
  })
  category: string;
}
