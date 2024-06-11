import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./jwt-constants";
import { AccessTokenNotAvailable, AccessTokenNotFoundException } from "../exceptions/jwt-exception";


@Injectable()
export class JwtGuard implements CanActivate{
    constructor(private jwtService:JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new AccessTokenNotFoundException("Access token not found in header")
        }
        try {
          const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: jwtConstants.secret
            }
          );
          request['user'] = payload;
        } catch {
          throw new AccessTokenNotAvailable("Access token expire or not available")
        }
        return true;
      }

    extractTokenFromHeader(request:Request):string | undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}