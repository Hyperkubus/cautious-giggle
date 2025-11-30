// src/seeds/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { defaultSeedConfig } from './seed.config';
import { seedPersons } from './persons.seed';
import { seedAccounts } from './accounts.seed';
import { seedTransactions } from './transactions.seed';

async function seed() {
  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const logger = new Logger('Seeder');

  try {
    const dataSource = appContext.get(DataSource);

    const config = defaultSeedConfig;
    logger.log(`Using seed config: ${JSON.stringify(config)}`);

    const persons = await seedPersons(dataSource, config);
    logger.log(`Seeded ${persons.length} persons`);

    const accounts = await seedAccounts(dataSource, config, persons);
    logger.log(`Seeded ${accounts.length} accounts`);

    const txs = await seedTransactions(dataSource, config, accounts);
    logger.log(`Seeded ${txs.length} transactions`);

    logger.log('✅ Seeding finished successfully');
  } catch (err) {
    logger.error('❌ Seeding failed', err);
    process.exitCode = 1;
  } finally {
    await appContext.close();
  }
}

seed();
