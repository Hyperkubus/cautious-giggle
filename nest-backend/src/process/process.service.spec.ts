import { Test, TestingModule } from '@nestjs/testing';
import { ProcessService } from './process.service';
import { AccountsService } from '../accounts/accounts.service';
import { PersonsService } from '../persons/persons.service';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Account from '../accounts/entities/account.entity';
import Person from '../persons/entities/person.entity';
import { DataSource } from 'typeorm';

describe('ProcessService', () => {
  let service: ProcessService;
  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProcessService>(ProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
