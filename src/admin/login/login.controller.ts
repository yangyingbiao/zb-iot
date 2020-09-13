import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { LocalGuard } from '../auth/guard/local.guard';

@Controller('login')
export class LoginController {
    
    @UseGuards(LocalGuard)
    @Post('signin')
    sign(@Request() req) {
        return req.user
    }
}
