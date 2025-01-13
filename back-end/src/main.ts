import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe, ValidationError, HttpException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    errorHttpStatusCode: 422,
    exceptionFactory: (errors: ValidationError[]) => {
      return new HttpException(
        {
          status: 422,
        },
        422,
      );
    },
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
