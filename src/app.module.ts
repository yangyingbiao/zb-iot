import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './admin/auth/auth.module';
import { LoginController } from './admin/login/login.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
