import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { UpdateOnboardingOrderDto } from './dto/update-onboarding-order.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AppService } from './app.service';
import { OnboardingOrderEntity } from './entities/onboarding-order.entity';
import { UserEntity } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put('order')
  updateOrder(
    @Body() orderDto: UpdateOnboardingOrderDto,
  ): Promise<OnboardingOrderEntity> {
    console.log(orderDto)
    return this.appService.updateOrder(orderDto);
  }

  @Get('order')
  getOrder(): Promise<OnboardingOrderEntity> {
    return this.appService.getOrder();
  }

  @Post('user')
  createUser(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    return this.appService.createUser(userDto);
  }

  @Get('user')
  getUsers(): Promise<UserEntity[]> {
    return this.appService.getUsers();
  }
}
