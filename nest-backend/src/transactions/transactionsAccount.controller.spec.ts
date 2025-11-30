import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsAccountController } from './transactionsAccount.controller';
import { TransactionsService } from './transactions.service';
import { DataSource } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Transaction from './entities/transaction.entity';
import Account from '../accounts/entities/account.entity';

describe('TransactionsAccountController', () => {
  let controller: TransactionsAccountController;
  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsAccountController],
      providers: [
        TransactionsService,
        AccountsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            create: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            findAndCount: jest.fn(),
            findOneBy: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Account),
          useValue: {
            create: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            findAndCount: jest.fn(),
            findOneBy: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getDataSourceToken(),
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    controller = module.get<TransactionsAccountController>(
      TransactionsAccountController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
