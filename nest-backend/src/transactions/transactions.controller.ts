import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';

@UseInterceptors(FormatResponseInterceptor)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountService: AccountsService,
  ) {}

  @Post('account/:iban/transaction')
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

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
