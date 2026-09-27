import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { envs } from '../config/envs.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PrismaService');

  constructor() {
    super({
      adapter: new PrismaBetterSqlite3({ url: envs.databaseUrl }),
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
}
