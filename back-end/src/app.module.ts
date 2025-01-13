import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OnboardingOrderEntity } from './entities/onboarding-order.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    TypeOrmModule.forFeature([UserEntity, OnboardingOrderEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
