import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const result = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { name: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
