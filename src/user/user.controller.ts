import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { RefreshTokenDto } from '../auth/dto/refreshToken.dto';
import { currentUser } from './decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@currentUser('id') id: number) {
    return this.userService.searchById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@currentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorite(
    @currentUser('id') id: number,
    @Param('productId') productId: string,
  ) {
    return this.userService.toggleFavorite(id, +productId);
  }
}
