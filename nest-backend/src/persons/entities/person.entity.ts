import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Account from '../../accounts/entities/account.entity';

@Entity({ name: 'persons' })
class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ default: 0 })
  networth: number;

  @Column({ default: 0 })
  borrowableAmount: number;

  @OneToMany(() => Account, (account) => account.owner, { onDelete: 'CASCADE' })
  accounts: Account[];

  @ManyToMany(() => Person, (person) => person.friends, { onDelete: 'CASCADE' })
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

export default Person;
