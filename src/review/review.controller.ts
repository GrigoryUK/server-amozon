import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CategoryDto } from '../category/dto/category.dto';
import { currentUser } from '../user/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  @Auth()
  async leaveReview(
    @currentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string,
  ) {
    return this.reviewService.create(id, dto, +productId);
  }
}
