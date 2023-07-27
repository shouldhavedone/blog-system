import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

export interface PaginationResult<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class PaginationService<T> {
  constructor(private readonly repository: Repository<T>) { }

  async paginate(page: number, limit: number): Promise<PaginationResult<T>> {
    const skip = (page - 1) * limit;
    const [results, total] = await this.repository.findAndCount({
      skip,
      take: limit,
    });

    return {
      results,
      total,
      page,
      limit,
    };
  }
}