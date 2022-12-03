import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDTO } from 'src/user/dto/user-create.dto';
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
    const { name, email, profileURL } = user;
    const entity = await this.userService.findOneByEmail(email);
    if (!entity) {
      await this.userService.create(new UserCreateDTO(name, email, profileURL));
    }
    const payload = { name, email };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
