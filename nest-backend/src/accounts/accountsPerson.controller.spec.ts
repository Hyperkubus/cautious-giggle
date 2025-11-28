import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountsPersonController } from './accountsPerson.controller';

describe('AccountsPersonController', () => {
  let controller: AccountsPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsPersonController],
      providers: [AccountsService],
    }).compile();

    controller = module.get<AccountsPersonController>(AccountsPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
