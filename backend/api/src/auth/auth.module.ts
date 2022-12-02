import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GithubOAuthStrategy } from './github.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1000y' }
    })
  ],
  providers: [AuthService, LocalStrategy, GithubOAuthStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
