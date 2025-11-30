import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import PersonsController from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Person from './entities/person.entity';
import Account from '../accounts/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Account])],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
