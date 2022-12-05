import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserCreateDTO } from 'src/user/dto/user-create.dto';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';
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

  async login(user: User, res: Response): Promise<UserResponseDTO> {
    const { name, email, profileURL } = user;
    const entity = await this.userService.findOneByEmail(email);
    if (!entity) {
      await this.userService.create(new UserCreateDTO(name, email, profileURL));
    }
    const payload = { name, email };
    const accessToken = this.jwtService.sign(payload);
    res.cookie('access_token', accessToken, {
      expires: new Date(Date.now() + 100 * 12 * 30 * 24 * 3600000),
      httpOnly: true,
      secure: true
    });

    return entity;
  }
}
