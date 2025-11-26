import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import CreateAccountDto from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':iban')
  findOne(@Param('iban') iban: string) {
    return this.accountsService.findOne(iban);
  }

  @Patch(':iban')
  update(
    @Param('iban') iban: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(iban, updateAccountDto);
  }

  @Delete(':iban')
  remove(@Param('iban') iban: string) {
    return this.accountsService.remove(iban);
  }
}
