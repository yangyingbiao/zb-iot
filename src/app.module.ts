import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './admin/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorModule } from './admin/administrator/administrator.module';
import { LoginModule } from './admin/login/login.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, AdministratorModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
