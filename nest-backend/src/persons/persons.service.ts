import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Person from './entities/person.entity';
import { Repository } from 'typeorm';
import { LendableAmountCalculationMethodEnum } from './enums/lendableAmountCalculationMethod.enum';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
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

  getLendableAmount(uuid: string, method: LendableAmountCalculationMethodEnum) {
    switch (method) {
      case LendableAmountCalculationMethodEnum.max:
        return this.calculateMaxLendableAmountByMax(uuid);
      case LendableAmountCalculationMethodEnum.sum:
        return this.calculateMaxLendableAmountBySum(uuid);
      default:
        throw new MethodNotAllowedException(
          `Calculation method is not allowed only 'max' or 'sum'.`,
        );
    }
  }

  private async calculateMaxLendableAmountBySum(uuid: string): Promise<number> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('person.friends', 'friend')
      .where('person.id = :uuid', { uuid })
      .select(
        `
      COALESCE(
        SUM(
          CASE 
            WHEN friend.networth > person.networth 
              THEN friend.networth - person.networth
            ELSE 0
          END
        ),
      0)
      `,
        'maxLendable',
      )
      .getRawOne<{ maxLendable: number }>();

    return result?.maxLendable ?? 0;
  }

  private async calculateMaxLendableAmountByMax(uuid: string): Promise<number> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('person.friends', 'friend')
      .where('person.id = :uuid', { uuid })
      .select(
        `
      COALESCE(
        MAX(
          CASE 
            WHEN friend.networth > person.networth 
              THEN friend.networth - person.networth
            ELSE 0
          END
        ),
      0)
      `,
        'maxLendable',
      )
      .getRawOne<{ maxLendable: number }>();

    return result?.maxLendable ?? 0;
  }
}
