import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ENV, PATHS } from './shared';

const docsPaths = Object.values(PATHS.DOCS)
console.log('docsPaths', ENV)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use([...docsPaths], basicAuth({
    challenge: true,
    users: {
      [ENV.SWAGGER_USERNAME]: ENV.SWAGGER_PASSWORD
    }
  }))

  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate API')
    .setDescription('The NestJS Boilerplate API description')
    .setVersion('1.0')
    .addTag('nestjs-boilerplate')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
