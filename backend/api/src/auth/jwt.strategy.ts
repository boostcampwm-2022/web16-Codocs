import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    return { nodeId: payload.nodeId, name: payload.name };
  }
}
const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['access_token'];

  return token;
};
