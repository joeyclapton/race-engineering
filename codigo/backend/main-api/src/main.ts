import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { enableSwaggerConfig } from '@/common/config/enable-swagger.config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from '@/notifications/notification.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const microNotifications =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      NotificationModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBITMQ_URL')],
          queue: configService.get<string>('RABBITMQ_QUEUE'),
          queueOptions: {
            durable: true,
          },
          noAck: false,
        },
      },
    );
  app.setGlobalPrefix('api');
  const port: number = configService.get<number>('PORT');

  app.set('trust proxy', 1);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  enableSwaggerConfig(app);

  await microNotifications.listen();
  await app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port} 🚀`);
  });
}

bootstrap();
