import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Person from './entities/person.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ) {}

  create(createPersonDto: CreatePersonDto) {
    const newPerson = this.personRepository.create({ ...createPersonDto });
    return this.personRepository.insert(newPerson);
  }

  findAll() {
    //toDo: Add pagination
    return this.personRepository.findAndCount();
  }

  findOne(uuid: string) {
    return this.personRepository.findOneBy({ id: uuid });
  }

  async findOneOrThrowException(uuid: string) {
    const person = await this.findOne(uuid);
    if (!person) {
      throw new NotFoundException(`Person with UUID ${uuid} not found.`);
    }
    return person;
  }

  update(uuid: string, updatePersonDto: UpdatePersonDto) {
    return this.personRepository.update({ id: uuid }, { ...updatePersonDto });
  }

  remove(uuid: string) {
    return this.personRepository.softDelete({ id: uuid });
  }

  async calculateBorrowableAmounts() {
    await this.dataSource.transaction(async (manager) => {
      await manager.query(`
        WITH friend_stats AS (
          SELECT
            p.id AS person_id,
            COALESCE(
              SUM(
                CASE
                  WHEN f."networth" > 0 THEN f."networth"
                  ELSE 0
                  END
              ),
              0
            ) AS total_friends_networth
          FROM persons p
                 LEFT JOIN person_friends pf
                           ON pf.person_id = p.id
                 LEFT JOIN persons f
                           ON f.id = pf.friend_id
          GROUP BY p.id
        )
        UPDATE persons p
        SET "borrowableAmount" = fs.total_friends_networth
        FROM friend_stats fs
        WHERE fs.person_id = p.id;
      `);
    });
  }

  async recalculateNetworth() {
    await this.dataSource.transaction(async (manager) => {
      await manager.query(`
          UPDATE persons p
          SET networth = COALESCE(a.sum_balance, 0)
          FROM (
            SELECT "person_id", SUM("balance") AS sum_balance
            FROM accounts
            GROUP BY "person_id"
          ) a
          WHERE p."id" = a."person_id";
      `);
    });
  }

  async loadWithFriends(uuid: string): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id: uuid },
      relations: { friends: true },
    });
    if (!person) throw new NotFoundException(`Person ${uuid} not found.`);

    return person;
  }

  async addFriendship(personId: string, friendId: string) {
    if (personId === friendId)
      throw new NotAcceptableException('A person cannot be its own friend.');
    const person = await this.loadWithFriends(personId);
    const friend = await this.loadWithFriends(friendId);

    if (!person.friends.some((f) => f.id === friendId))
      person.friends.push(friend);
    if (!friend.friends.some((p) => p.id === personId))
      friend.friends.push(person);

    await this.personRepository.update({ id: personId }, person);
    await this.personRepository.update({ id: friendId }, friend);
  }

  async deleteFriendship(personId: string, friendId: string) {
    const person = await this.loadWithFriends(personId);
    const friend = await this.loadWithFriends(friendId);

    person.friends = person.friends.filter((f) => f.id !== friendId);
    friend.friends = friend.friends.filter((f) => f.id !== personId);

    await this.personRepository.update({ id: personId }, person);
    await this.personRepository.update({ id: friendId }, friend);
  }
}
