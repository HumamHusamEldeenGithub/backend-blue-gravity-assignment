import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blue Gravity Assignment API')
    .setDescription('API description for Blue Gravity Assignment')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Save Swagger JSON to a file
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('api', app, document);

  app.use('/', swaggerUi.serve, swaggerUi.setup(document));

  await app.listen(3000);
}
bootstrap();
