import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import Transaction from './entities/transaction.entity';
import Account from '../accounts/entities/account.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('TransactionsService', () => {
  let service: TransactionsService;
  const mockRepo = {
    create: jest.fn(),
    insert: jest.fn(),
    findAndCount: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('lets us create new transactions', async () => {
    const iban = 'DE0123456789';
    const amount = 523;
    const dto = { amount: 523 } as CreateTransactionDto;
    mockRepo.create.mockReturnValue({
      id: 'da4ca048-df40-4dba-b12c-28497deb5329',
      amount: amount,
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    mockRepo.insert.mockReturnValue({
      id: 'da4ca048-df40-4dba-b12c-28497deb5329',
      amount: amount,
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await service.create({ iban: iban } as Account, dto);

    expect(mockRepo.create).toHaveBeenCalledTimes(1);
    expect(mockRepo.insert).toHaveBeenCalledTimes(1);
  });
});
