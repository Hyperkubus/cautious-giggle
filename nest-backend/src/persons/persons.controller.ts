import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseFilters,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LendableAmountCalculationMethodEnum } from './enums/lendableAmountCalculationMethod.enum';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('persons')
class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new person.' })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all persons.' })
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'List person with id' })
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const person = await this.personsService.findOne(uuid);
    if (!person)
      throw new NotFoundException(`Person with UUID ${uuid} not found`);
    return person;
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update person.' })
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personsService.update(uuid, updatePersonDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete person.' })
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.personsService.remove(uuid);
  }

  @Get(':uuid/lendableAmount')
  @ApiOperation({ summary: 'Get maximal lendable amount for person' })
  @ApiQuery({
    name: 'method',
    enum: LendableAmountCalculationMethodEnum,
    required: true,
  })
  getLendableAmount(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Query('method') method: LendableAmountCalculationMethodEnum,
  ) {
    return this.personsService.getLendableAmount(uuid, method);
  }
}

export default PersonsController;
