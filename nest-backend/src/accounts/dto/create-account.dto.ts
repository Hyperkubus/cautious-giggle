import { IsIBAN, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateAccountDto {
  @IsIBAN()
  @MaxLength(34)
  @ApiProperty({
    description: 'IBAN of the account',
    example: 'EU1234567890EU1234567890',
  })
  iban: string;

  @IsString()
  @ApiProperty({
    description: 'Account label for reference',
    example: 'Checking Account',
  })
  label: string;
}

export default CreateAccountDto;
