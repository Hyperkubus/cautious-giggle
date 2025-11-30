import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsAccountController } from './transactionsAccount.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsAccountController', () => {
  let controller: TransactionsAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsAccountController],
      providers: [TransactionsService],
    }).compile();

    controller = module.get<TransactionsAccountController>(
      TransactionsAccountController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
