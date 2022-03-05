import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Process } from 'constants/process';
import { ApplicationModule } from './application.module';

(async () => {
  const { PORT, HOST } = Process;

  const application = await NestFactory.create(ApplicationModule);

  const validationPipe = new ValidationPipe();
  application.useGlobalPipes(validationPipe);

  await application.listen(PORT, HOST);
})();
