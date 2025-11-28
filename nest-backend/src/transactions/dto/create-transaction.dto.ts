import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty({ description: 'Transaction amount', example: '235' })
  amount: number;

  @IsString()
  @MaxLength(140)
  @IsOptional()
  @ApiProperty({
    description: 'Transaction description',
    example: 'Rent 2026-05',
    required: false,
  })
  description: string;
}
