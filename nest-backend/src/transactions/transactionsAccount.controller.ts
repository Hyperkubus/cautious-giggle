import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(FormatResponseInterceptor)
@ApiTags('Accounts')
@Controller('accounts')
export class TransactionsAccountController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountService: AccountsService,
  ) {}

  @Post(':iban/transactions')
  async create(
    @Param('iban') iban: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const account = await this.accountService.findOne(iban);
    if (!account) {
      throw new NotFoundException(`Account ${iban} not found.`);
    }
    return this.transactionsService.create(account, createTransactionDto);
  }

  @Get(':iban/transactions')
  async findAll(@Param('iban') iban: string) {
    const account = await this.accountService.findOneOrThrowException(iban);
    return this.transactionsService.findAllOfAccount(account);
  }
}
