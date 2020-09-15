import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './admin/auth/guard/jwt.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
