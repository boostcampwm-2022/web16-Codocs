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
      // https://github.com/login/oauth/authorize?client_id=eed0086cbb5575f05dd1&scope=user:email,read:user`
    });
  }

  async validate(accessToken, refreshToken, profile, done): Promise<any> {
    if (!accessToken) {
      return UnauthorizedException;
    }
    console.log(accessToken);
    console.log(profile);
    const { name, node_id, avatar_url } = profile._json;

    return { nodeId: node_id, name, profileURL: avatar_url };
  }
}
