import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Person from '../persons/entities/person.entity';
import Account from '../accounts/entities/account.entity';
import Transaction from '../transactions/entities/transaction.entity';
import { PersonsModule } from '../persons/persons.module';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Account, Transaction]),
    PersonsModule,
    AccountsModule,
    TransactionsModule,
  ],
  providers: [ProcessService],
  controllers: [ProcessController],
})
export class ProcessModule {}
