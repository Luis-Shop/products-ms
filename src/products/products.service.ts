import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalItems = await this.prisma.product.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalItems / limit);

    return {
      meta: {
        total: totalItems,
        page,
        lastPage,
      },
      data: await this.prisma.product.findMany({
        where: { available: true },
        skip: (page - 1) * limit,
        take: limit,
      }),
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id, available: true },
    });

    if (!product)
      throw new NotFoundException(`product with id ${id} not found`);

    return product;
  }

  async update(id: number, updateProduct: Omit<UpdateProductDto, 'id'>) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProduct,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // return this.prisma.product.delete({ where: { id } });

    return await this.prisma.product.update({
      where: { id },
      data: { available: false },
    });
  }
}
