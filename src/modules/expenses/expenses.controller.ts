import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PaginationDto } from './dto/pagination.dto';
import { SearchExpensesQueryDto } from './dto/search-expenses.query.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { ExpenseResponseDto } from './dto/expense-response.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get('categories')
  getCategories(): Promise<string[]> {
    return this.expensesService.categories();
  }

  @Get('search')
  search(
    @Query() query: SearchExpensesQueryDto,
  ): Promise<PaginatedResponse<ExpenseResponseDto>> {
    return this.expensesService.search(query);
  }

  @Get()
  getExpenses(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<ExpenseResponseDto>> {
    return this.expensesService.getAll(paginationDto);
  }

  @Get(':id')
  getExpenseById(@Param('id') id: string): Promise<ExpenseResponseDto> {
    return this.expensesService.findById(id);
  }

  @Post()
  @HttpCode(201)
  createExpense(@Body() body: CreateExpenseDto): Promise<ExpenseResponseDto> {
    return this.expensesService.create(body);
  }

  @Put(':id')
  updateExpense(
    @Param('id') id: string,
    @Body() body: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return this.expensesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteExpense(@Param('id') id: string): Promise<void> {
    return this.expensesService.remove(id);
  }
}
