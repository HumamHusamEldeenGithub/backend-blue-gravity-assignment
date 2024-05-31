import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/is-public.decorator';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get swagger file' })
  getSwaggerJson(@Res() res: Response): void {
    const swaggerFilePath = path.join(__dirname, '..', 'swagger.json');
    if (fs.existsSync(swaggerFilePath)) {
      const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerFile);
    } else {
      res.status(404).send('Swagger JSON file not found');
    }
  }
}
