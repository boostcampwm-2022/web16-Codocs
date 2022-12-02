import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:8000/auth/callback'
      // https://github.com/login/oauth/authorize?client_id=eed0086cbb5575f05dd1
    });
  }

  async validate(accessToken, refreshToken, profile, done): Promise<any> {
    if (!accessToken) {
      return UnauthorizedException;
    }

    return profile._json.node_id;
  }
}
