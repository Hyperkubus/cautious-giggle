import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Person from './entities/person.entity';
import { DataSource } from 'typeorm';

describe('PersonsService', () => {
  let service: PersonsService;

  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonsService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            create: jest.fn(() => {
              return {
                name: 'John Doe',
                email: 'john@d.oe',
                id: 'test',
              } as Person;
            }),
            insert: jest.fn(() => {
              return {
                name: 'John Doe',
                email: 'john@d.oe',
                id: 'test',
              } as Person;
            }),
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

    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
