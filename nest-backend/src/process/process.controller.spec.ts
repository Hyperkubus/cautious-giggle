import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { AccountsService } from '../accounts/accounts.service';
import { PersonsService } from '../persons/persons.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Account from '../accounts/entities/account.entity';
import Person from '../persons/entities/person.entity';

describe('ProcessController', () => {
  let controller: ProcessController;
  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessController],
      providers: [
        ProcessService,
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

    controller = module.get<ProcessController>(ProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
