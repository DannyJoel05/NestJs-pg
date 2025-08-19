import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/util';
import { envs } from './common/config';

async function bootstrap() {
  const looger = new Logger('MS-USER');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,               // convierte tipos automáticamente usando @Type
      whitelist: true,               // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true,    // lanza error si llegan propiedades no definidas
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());


  await app.listen(envs.port);
  looger.log(`MS-USER: en el puerto ${envs.port}`)
}
bootstrap();
