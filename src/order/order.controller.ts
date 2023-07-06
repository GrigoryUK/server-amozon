import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { currentUser } from '../user/decorators/user.decorator';
import { th } from '@faker-js/faker';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  async getAll(@currentUser('id') userId: number) {
    return this.orderService.getAll(userId);
  }
}
