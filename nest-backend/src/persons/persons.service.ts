import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  create(createPersonDto: CreatePersonDto) {
    const newPerson = this.personRepository.create({ ...createPersonDto });
    return this.personRepository.save(newPerson);
  }

  findAll() {
    //toDo: Add pagination
    return this.personRepository.findAndCount();
  }

  findOne(id: string) {
    return this.personRepository.findOneBy({ id: id });
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    return this.personRepository.save({ id: id, ...updatePersonDto });
  }

  remove(id: string) {
    return this.personRepository.softDelete({ id: id });
  }
}
