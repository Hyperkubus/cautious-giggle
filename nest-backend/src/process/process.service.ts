import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { PersonsService } from '../persons/persons.service';

@Injectable()
export class ProcessService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly personsService: PersonsService,
  ) {}

  calculateAccountBalance() {
    return this.accountsService.recalculateAllBalances(false);
  }

  calculateNetworth() {
    return this.personsService.recalculateNetworth();
  }

  calculateMaxLendableAmount() {
    return this.personsService.calculateBorrowableAmounts();
  }
}
