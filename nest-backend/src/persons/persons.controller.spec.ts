import { Test, TestingModule } from '@nestjs/testing';
import PersonsController from './persons.controller';
import { PersonsService } from './persons.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import Person from './entities/person.entity';

describe('PersonsController', () => {
  let controller: PersonsController;
  const dataSourceMock: Partial<DataSource> = {
    transaction: jest.fn().mockImplementation(async (cb: any) => {
      const fakeManager = {} as any;
      return await cb(fakeManager);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        PersonsService,
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

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
