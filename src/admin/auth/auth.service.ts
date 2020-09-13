import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async validateUser(account : string, password : string) : Promise<any>{
        return {username : 'bill'}
    }
}
