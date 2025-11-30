import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Person from '../persons/entities/person.entity';
import { Repository } from 'typeorm';
import Account from '../accounts/entities/account.entity';
import Transaction from '../transactions/entities/transaction.entity';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  calculateAccountBalance() {}

  calculateNetworth() {}

  calculateMaxLendableAmount() {}
}
