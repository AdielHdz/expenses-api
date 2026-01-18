import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { SearchExpensesQueryDto } from './dto/search-expenses.query.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { ExpenseResponseDto } from './dto/expense-response.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  private toResponse(expense: Expense): ExpenseResponseDto {
    const { id, description, amount, category, date } = expense;

    return { id, description, amount, category, date };
  }

  async findById(id: string): Promise<ExpenseResponseDto> {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID must be a numeric string');
    }

    const expense = await this.expenseRepository.findOne({
      where: { id },
    });

    if (!expense)
      throw new NotFoundException(`Expense with the id ${id} was not found`);

    return this.toResponse(expense);
  }

  async getAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<ExpenseResponseDto>> {
    const { limit, page } = paginationDto;

    const skip = (page - 1) * limit;

    const [expenses, total] = await this.expenseRepository.findAndCount({
      take: limit,
      skip,
      order: { date: 'DESC' },
    });

    return {
      data: expenses.map((expense) => this.toResponse(expense)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async search(
    query: SearchExpensesQueryDto,
  ): Promise<PaginatedResponse<ExpenseResponseDto>> {
    const { description, limit, page, category } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.expenseRepository.createQueryBuilder('expense');

    if (description) {
      queryBuilder.andWhere('expense.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (category) {
      queryBuilder.andWhere('expense.category = :category', {
        category,
      });
    }

    queryBuilder.orderBy('expense.date', 'DESC').skip(skip).take(limit);

    const [expenses, total] = await queryBuilder.getManyAndCount();

    return {
      data: expenses.map((expense) => this.toResponse(expense)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(body: CreateExpenseDto): Promise<ExpenseResponseDto> {
    try {
      const expense = this.expenseRepository.create(body);
      const saved = await this.expenseRepository.save(expense);

      return this.toResponse(saved);
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new ConflictException('Expense already exists');
      }
      throw error;
    }
  }

  async update(
    id: string,
    body: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID must be a numeric string');
    }

    const expense = await this.expenseRepository.preload({
      id,
      ...body,
    });

    if (!expense)
      throw new NotFoundException(`Expense with the id ${id} was not found`);

    const saved = await this.expenseRepository.save(expense);
    return this.toResponse(saved);
  }

  async remove(id: string): Promise<void> {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID must be a numeric string');
    }

    const result = await this.expenseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Expense with the id ${id} was not found`);
    }
  }

  async categories(): Promise<string[]> {
    const categories = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('DISTINCT expense.category', 'category')
      .where('expense.category IS NOT NULL')
      .orderBy('expense.category', 'ASC')
      .getRawMany();

    return categories.map((expense: Expense) => expense.category);
  }
}
