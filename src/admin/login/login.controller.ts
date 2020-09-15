import { Controller, UseGuards, Request, Post, Body, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { LocalGuard } from '../auth/guard/local.guard';

@Controller('login')
export class LoginController {
    constructor(
        private authService : AuthService
    ) {}
   // @UseGuards(LocalGuard)
    @Post('signin')
    sign(@Request() req) {
        return this.authService.generateNonceStr(32)
        return this.authService.login(req.user)
    }


    @UseGuards(JwtGuard)
    @Post('refresh')
    refresh(@Body() params) {
        if(!params.token) return 'no';
        
        //return this.authService.verify(params.token)
    }
}
