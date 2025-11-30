import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Account from './entities/account.entity';
import { DataSource } from 'typeorm';

describe('AccountsController', () => {
  let controller: AccountsController;

  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
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

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
