import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  @MaxLength(140)
  description: string;
}
