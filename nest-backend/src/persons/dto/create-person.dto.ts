import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  networth: number;
}
