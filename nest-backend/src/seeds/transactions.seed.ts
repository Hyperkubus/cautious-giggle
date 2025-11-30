// src/seeds/transactions.seed.ts
import { DataSource } from 'typeorm';
import Transaction from '../transactions/entities/transaction.entity';
import Account from '../accounts/entities/account.entity';
import { SeedConfig } from './seed.config';
import { randomInt } from 'node:crypto';

export async function seedTransactions(
  dataSource: DataSource,
  config: SeedConfig,
  accounts: Account[],
) {
  const transactionRepo = dataSource.getRepository(Transaction);

  const allTx: Transaction[] = [];
  const now = new Date();

  for (const account of accounts) {
    const transactionCount = randomInt(
      config.minTransactionsPerAccount,
      config.maxTransactionsPerAccount,
    );

    for (let i = 0; i < transactionCount; i++) {
      let processed: Date | null = null;
      const amount = randomInt(-500, 500000); // if you store as plain number (e.g. 2 decimals)
      if (randomInt(2) >= 1) processed = new Date(now.getTime());
      const tx = transactionRepo.create({
        account: { iban: account.iban } as Account,
        description: 'seeded transaction',
        amount: amount, // or 'balanceAfter'
        processedAt: processed,
      });

      allTx.push(tx);
    }
  }

  await transactionRepo.save(allTx);

  return allTx;
}
