import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import Administrator from '../../entity/administrator'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Administrator])],
  providers: [AdministratorService],
  exports : [AdministratorService]
})
export class AdministratorModule {}
