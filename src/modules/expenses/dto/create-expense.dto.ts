import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'amount must have at most 2 decimal places' },
  )
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  category: string;
}
