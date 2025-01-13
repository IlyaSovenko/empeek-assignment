import { IsNotEmpty, IsDefined, IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @Transform((params: TransformFnParams): string | undefined =>
    params.value?.toLowerCase().trim(),
  )
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  state: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  about: string;
}
