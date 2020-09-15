import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        //throw new UnauthorizedException();
        return super.canActivate(context);
    }
}