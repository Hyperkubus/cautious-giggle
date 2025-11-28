import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import CreateAccountDto from './dto/create-account.dto';
import { PersonsService } from '../persons/persons.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
    @Param('ownerId') ownerId: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    const owner = await this.personService.findOneOrThrowException(ownerId);
    return this.accountsService.create(owner, createAccountDto);
  }

  @Get(':ownerId/accounts')
  @ApiOperation({ summary: 'List all of owners accounts.' })
  async findAll(@Param('ownerId') ownerId: string) {
    const owner = await this.personService.findOneOrThrowException(ownerId);
    return this.accountsService.findAllOfOwner(owner);
  }
}
