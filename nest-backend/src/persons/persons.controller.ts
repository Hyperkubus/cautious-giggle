import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { FriendshipDto } from './dto/friendship.dto';

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

  @Get(':uuid/friends')
  @ApiOperation({ summary: 'Get person with friends.' })
  getWithFriends(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.personsService.loadWithFriends(uuid);
  }
  @Post(':uuid/friends')
  @ApiOperation({ summary: 'Add friend to person.' })
  addFriend(
    @Param('uuid', new ParseUUIDPipe()) personId: string,
    @Body() friendshipDto: FriendshipDto,
  ) {
    return this.personsService.addFriendship(personId, friendshipDto.uuid);
  }

  @Delete(':uuid/friends')
  @ApiOperation({ summary: 'Remove friend from person.' })
  removeFriend(
    @Param('uuid', new ParseUUIDPipe()) personId: string,
    @Body() friendshipDto: FriendshipDto,
  ) {
    return this.personsService.deleteFriendship(personId, friendshipDto.uuid);
  }
}

export default PersonsController;
