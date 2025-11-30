import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountsPersonController } from './accountsPerson.controller';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Account from './entities/account.entity';
import { DataSource } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import Person from '../persons/entities/person.entity';

describe('AccountsPersonController', () => {
  let controller: AccountsPersonController;
  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsPersonController],
      providers: [
        AccountsService,
        PersonsService,
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
          provide: getRepositoryToken(Person),
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

    controller = module.get<AccountsPersonController>(AccountsPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
