import { Injectable, NotFoundException } from '@nestjs/common';
import CreateAccountDto from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import Account from './entities/account.entity';
import Person from '../persons/entities/person.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}
  create(owner: Person, createAccountDto: CreateAccountDto) {
    const newAccount = this.accountRepository.create({
      owner: owner,
      ...createAccountDto,
    });
    return this.accountRepository.insert(newAccount);
  }

  findAll() {
    return this.accountRepository.findAndCount();
  }

  findAllOfOwner(ownerId: string) {
    return this.accountRepository.findAndCountBy({ owner: { id: ownerId } });
  }

  findOne(iban: string) {
    return this.accountRepository.findOneBy({ iban: iban });
  }

  async findOneOrThrowException(iban: string) {
    const account = await this.accountRepository.findOneBy({ iban: iban });
    if (!account) {
      throw new NotFoundException(`Account with IBAN ${iban} not found.`);
    }
    return account;
  }

  update(iban: string, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(
      { iban: iban },
      { ...updateAccountDto },
    );
  }

  remove(iban: string) {
    return this.accountRepository.softDelete({ iban: iban });
  }

  async recalculateAllBalances(useAllTransactions: boolean = false) {
    let whereClause = 'WHERE "processedAt" IS NULL';
    if (useAllTransactions) {
      whereClause = '';
    }
    await this.dataSource.transaction(async (manager) => {
      await manager.query(`
          UPDATE accounts a
          SET balance = COALESCE(t.sum_amount, 0)
          FROM (
            SELECT "iban", SUM("amount") AS sum_amount
            FROM transactions
            ${whereClause}
            GROUP BY "iban"
          ) t
          WHERE a."iban" = t."iban";
      `);
    });
  }
}
