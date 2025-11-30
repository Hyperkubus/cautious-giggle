export interface SeedConfig {
  persons: number;
  minFriendsPerPerson: number;
  maxFriendsPerPerson: number;
  minAccountsPerPerson: number;
  maxAccountsPerPerson: number;
  minTransactionsPerAccount: number;
  maxTransactionsPerAccount: number;
}

export const defaultSeedConfig: SeedConfig = {
  persons: 215,
  minFriendsPerPerson: 0,
  maxFriendsPerPerson: 6,
  minAccountsPerPerson: 1,
  maxAccountsPerPerson: 5,
  minTransactionsPerAccount: 2,
  maxTransactionsPerAccount: 10,
};
