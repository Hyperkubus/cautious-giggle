import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Person from '../../persons/entities/person.entity';
import Transaction from '../../transactions/entities/transaction.entity';

@Entity({ name: 'accounts' })
class Account {
  @PrimaryColumn({ length: 34 })
  iban: string;

  @Column({ nullable: true })
  label?: string;

  @ManyToOne(() => Person, (person): Account[] => person.accounts, {
    eager: true,
  })
  @JoinColumn({ name: 'person_id' })
  owner: Person;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}

export default Account;
