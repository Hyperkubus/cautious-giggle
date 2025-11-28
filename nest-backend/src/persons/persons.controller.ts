import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('persons')
export class PersonsController {
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
  findOne(@Param('uuid') uuid: string) {
    return this.personsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update person.' })
  update(
    @Param('uuid') uuid: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personsService.update(uuid, updatePersonDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete person.' })
  remove(@Param('uuid') uuid: string) {
    return this.personsService.remove(uuid);
  }
}
