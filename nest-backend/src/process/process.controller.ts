import {
  Controller,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProcessService } from './process.service';
import { PersonsService } from '../persons/persons.service';
import { ProcessEnum } from './enums/process.enum';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('process')
export class ProcessController {
  constructor(
    private readonly processService: ProcessService,
    private readonly personsService: PersonsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Call process.' })
  @ApiQuery({
    name: 'process',
    enum: ProcessEnum,
    required: true,
  })
  create(@Query('process') process: ProcessEnum) {
    if (process >= ProcessEnum.accountsBalance) {
      this.processService.calculateAccountBalance();
    }
    if (process >= ProcessEnum.personsNetworth) {
      this.processService.calculateNetworth();
    }
    if (process >= ProcessEnum.maxLendableAmount) {
      this.processService.calculateMaxLendableAmount();
    }

    return true;
  }
}
