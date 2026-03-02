import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DB_CONNECTION } from './shared';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from './handlers/exception.handler';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => ({})],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB.URI'),
    //     user: configService.get<string>('MONGODB.USERNAME'),
    //     pass: configService.get<string>('MONGODB.PASSWORD'),
    //   }),
    //   inject: [ConfigService],
    //   connectionName: DB_CONNECTION.NAME
    // }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    Logger, 
    { provide: APP_FILTER, useClass: ExceptionHandler }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
