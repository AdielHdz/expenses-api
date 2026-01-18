import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class SearchExpensesQueryDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsString()
  category: string;
}
