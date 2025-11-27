import { Injectable } from '@nestjs/common';
import CreateAccountDto from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Account from './entities/account.entity';
import Person from '../persons/entities/person.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  create(owner: Person, createAccountDto: CreateAccountDto) {
    const newAccount = this.accountRepository.create({
      owner: owner,
      ...createAccountDto,
    });
    return this.accountRepository.save(newAccount);
  }

  findAll() {
    return this.accountRepository.findAndCount();
  }

  findOne(iban: string) {
    return this.accountRepository.findOneBy({ iban: iban });
  }

  update(iban: string, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.save({ iban: iban, ...updateAccountDto });
  }

  remove(iban: string) {
    return this.accountRepository.softDelete({ iban: iban });
  }
}
