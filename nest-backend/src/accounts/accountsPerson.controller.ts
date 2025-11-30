import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseInterceptors,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import CreateAccountDto from './dto/create-account.dto';
import { PersonsService } from '../persons/persons.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@ApiTags('Persons')
@Controller('persons')
export class AccountsPersonController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly personService: PersonsService,
  ) {}

  @Post(':ownerId/accounts')
  @ApiOperation({ summary: 'Create a new account for owner.' })
  async createPersonAccount(
    @Param('ownerId', new ParseUUIDPipe()) ownerId: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    const owner = await this.personService.findOneOrThrowException(ownerId);
    return this.accountsService.create(owner, createAccountDto);
  }

  @Get(':ownerId/accounts')
  @ApiOperation({ summary: 'List all of owners accounts.' })
  async findAll(@Param('ownerId', new ParseUUIDPipe()) ownerId: string) {
    return this.accountsService.findAllOfOwner(ownerId);
  }
}
