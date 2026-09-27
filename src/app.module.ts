import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaModule, ProductsModule],
})
export class AppModule {}
