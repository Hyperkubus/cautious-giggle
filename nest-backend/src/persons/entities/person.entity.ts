import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'persons' })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ default: 0 })
  networth: number;

  //ToDo: Add Account Relation
  /*@OneToMany(() => Account, (account) => account.owner)
  accounts: AccountEntity[];*/

  @ManyToMany(() => Person, (person) => person.friends)
  @JoinTable({
    name: 'person_friends',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'friend_id', referencedColumnName: 'id' },
  })
  friends: Person[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
