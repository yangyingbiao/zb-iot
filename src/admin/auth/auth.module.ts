import { Module } from '@nestjs/common';
import { AdministratorModule } from '../administrator/administrator.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports : [AdministratorModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}
