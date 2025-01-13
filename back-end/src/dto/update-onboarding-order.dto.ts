import { IsNotEmpty, IsDefined, IsNumber } from 'class-validator';

export class UpdateOnboardingOrderDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  addressStep: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  birthdayStep: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  aboutStep: number;
}
