import {
  Controller,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProcessService } from './process.service';
import { ProcessEnum } from './enums/process.enum';
import { FormatResponseInterceptor } from '../common/interceptors/formatResponse.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  @ApiOperation({ summary: 'Call process.' })
  @ApiQuery({
    name: 'process',
    enum: ProcessEnum,
    required: true,
  })
  async create(@Query('process') process: ProcessEnum) {
    if (process >= ProcessEnum.accountsBalance) {
      await this.processService.calculateAccountBalance();
    }
    if (process >= ProcessEnum.personsNetworth) {
      await this.processService.calculateNetworth();
    }
    if (process >= ProcessEnum.maxLendableAmount) {
      await this.processService.calculateMaxLendableAmount();
    }
    return;
  }
}
