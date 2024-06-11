import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';


@Injectable()
export class Token {
  constructor(private jwtService: JwtService) {}

  async extractToken(@Req() req): Promise<string> {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    log(decoded.sub);
    return decoded.sub;
  }
}
