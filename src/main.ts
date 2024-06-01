import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blue Gravity Assignment API')
    .setDescription('API description for Blue Gravity Assignment')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Development Server')
    .addServer(
      'https://backend-blue-gravity-assignment.onrender.com',
      'Production Server',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Save Swagger JSON to a file
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
