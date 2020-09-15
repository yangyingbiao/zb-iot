var crypto = require('crypto');
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { AdministratorService } from '../administrator/administrator.service';
import { LOGIN_JWT_SECRET, REFRESH_LOGIN_JWT_SECRET } from '../../config'
import { random, time } from '../../utils'

const md5 = (str : string | number) => crypto.createHash('md5').update(str).digest('hex')

@Injectable()
export class AuthService {
    constructor(
        private readonly administratorService : AdministratorService
    ) {}
    async validateUser(account : string, password : string) : Promise<any>{
        let administrator = await this.administratorService.findAdministratorByAccount(account, ['user_id', 'password', 'salt', 'name', 'super', 'status'])
        if(!administrator || administrator.password !== md5(md5(password) + administrator.salt)) return null

        delete administrator.password
        delete administrator.salt

        return administrator
    }

    login(administrator : any) {
        const expiresIn = 7200
        let authJwt = new JwtService({secret : LOGIN_JWT_SECRET})
        const loginToken = authJwt.sign({key : administrator.user_id}, {expiresIn : expiresIn})

        let refreshJwt = new JwtService({secret : REFRESH_LOGIN_JWT_SECRET})
        const refreshToken = refreshJwt.sign({key : administrator.user_id}, {expiresIn : expiresIn})

        return {user : administrator, token : loginToken, refresh : refreshToken}
    }

    verifyRefresh(token : string) {
        let refreshJwt = new JwtService({secret : REFRESH_LOGIN_JWT_SECRET})
        try {
            let result = refreshJwt.verify(token)
            //验证通过
            let userId = result.key

            return result
        } catch (error) { //验证不通过
            return null
        }
    }
    

    generateLoginToken(user : any) {
        let payload : any = {key : user.user_id, uid : random(user.user_id, user.user_id * random(2, 5)), nonceStr : this.generateNonceStr(32), time : time()}
        let keys = Object.keys(payload)
        keys.sort()

        let temp = keys.map(key => key + '=' + payload[key]).join('&')
        payload.sign = md5(temp)
    }

    generateNonceStr(len : number = 32) {
        const chars = 'q1w2ert3yu4i5opa6sdf7gh8jklz9xcvb0nm'
        let str = ''
        for(let i =0; i < len; i ++) {
            str += chars.charAt(random(0, str.length - 1))
        }

        return str
    }
    
}