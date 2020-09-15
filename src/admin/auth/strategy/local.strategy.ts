import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService : AuthService
    ) {
        super({
            usernameField : 'account',
            passwordField : 'password'
        })
    }

    async validate(account : string, password : string) : Promise<any>{
        const user = await this.authService.validateUser(account, password)
        if(!user) throw new UnauthorizedException('账号或密码不正确')

        return user
    }
}