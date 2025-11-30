import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'List all accounts.' })
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':iban')
  @ApiOperation({ summary: 'Get account details.' })
  findOne(@Param('iban') iban: string) {
    return this.accountsService.findOne(iban);
  }

  @Patch(':iban')
  @ApiOperation({ summary: 'Update account.' })
  update(
    @Param('iban') iban: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(iban, updateAccountDto);
  }

  @Delete(':iban')
  @ApiOperation({ summary: 'Delete account.' })
  remove(@Param('iban') iban: string) {
    return this.accountsService.remove(iban);
  }
}
