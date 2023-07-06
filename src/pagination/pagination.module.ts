import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationController } from './pagination.controller';
import { PrismaService } from '../config/prisma.service';

@Module({
  controllers: [PaginationController],
  providers: [PaginationService, PrismaService],
})
export class PaginationModule {}