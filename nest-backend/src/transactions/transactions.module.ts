import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Transaction from './entities/transaction.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsAccountController } from './transactionsAccount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountsModule],
  controllers: [TransactionsController, TransactionsAccountController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
