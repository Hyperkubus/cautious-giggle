import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Transaction from './entities/transaction.entity';
import { Repository } from 'typeorm';
import Account from '../accounts/entities/account.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  create(account: Account, createTransactionDto: CreateTransactionDto) {
    const newTransaction = this.transactionRepository.create({
      account: account,
      ...createTransactionDto,
    });
    return this.transactionRepository.save(newTransaction);
  }

  findAll() {
    return this.transactionRepository.findAndCount();
  }

  findOne(id: string) {
    return this.transactionRepository.findOneBy({ id: id });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.save({ id: id, ...updateTransactionDto });
  }

  remove(id: string) {
    return this.transactionRepository.softDelete({ id: id });
  }
}
