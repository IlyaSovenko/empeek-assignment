import { Injectable } from '@nestjs/common';
import { OnboardingOrderEntity } from './entities/onboarding-order.entity';
import { UpdateOnboardingOrderDto } from './dto/update-onboarding-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(OnboardingOrderEntity)
    private onboardingOrderRepository: Repository<OnboardingOrderEntity>,
  ) {}

  async updateOrder(
    order: UpdateOnboardingOrderDto,
  ): Promise<OnboardingOrderEntity> {
    const orderEntity = await this.onboardingOrderRepository.findOne({ where: {}});
    console.log(order);
    orderEntity.aboutStep = order.aboutStep;
    orderEntity.addressStep = order.addressStep;
    orderEntity.birthdayStep = order.birthdayStep;
    await this.onboardingOrderRepository.save(orderEntity);
    return orderEntity;
  }

  async getOrder(): Promise<OnboardingOrderEntity> {
    let orderEntity = await this.onboardingOrderRepository.findOne({ where: {}});
    if (!orderEntity) {
      orderEntity = await this.onboardingOrderRepository.save(
        this.onboardingOrderRepository.create({
          aboutStep: 2,
          addressStep: 3,
          birthdayStep: 2,
        }),
      );
    }

    return orderEntity;
  }

  createUser(userData: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(this.usersRepository.create(userData));
  }

  getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }
}
