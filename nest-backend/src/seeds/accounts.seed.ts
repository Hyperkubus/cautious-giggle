import { DataSource } from 'typeorm';
import Account from '../accounts/entities/account.entity';
import Person from '../persons/entities/person.entity';
import { SeedConfig } from './seed.config';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedAccounts(
  dataSource: DataSource,
  config: SeedConfig,
  persons: Person[],
) {
  const accountRepo = dataSource.getRepository(Account);

  const accounts: Account[] = [];
  let ibanCounter = 1;

  for (const person of persons) {
    const accountCount = randomInt(
      config.minAccountsPerPerson,
      config.maxAccountsPerPerson,
    );

    for (let i = 0; i < accountCount; i++) {
      const ibanSuffix = String(ibanCounter).padStart(10, '0');
      const account = accountRepo.create({
        iban: `DE0012345678${ibanSuffix}`,
        owner: { id: person.id } as Person,
        balance: randomInt(-10000000, 10000000),
      });

      accounts.push(account);
      ibanCounter++;
    }
  }

  await accountRepo.save(accounts);

  return accounts;
}
