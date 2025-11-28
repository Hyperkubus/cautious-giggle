import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty({ description: 'Persons name', example: 'Hans Peter B.' })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Persons email address',
    example: 'hp.b@cityroll.er',
  })
  email: string;
}
