import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Person from '../../persons/entities/person.entity';

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

  //ToDo: Add Tramsactions
  /*@OneToMany(() => Transaction,(transaction) => transaction.account,)
  transactions: Transaction[];*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}

export default Account;
