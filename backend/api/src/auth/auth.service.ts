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

  async validateUser(nodeId: string): Promise<any> {
    const user = await this.userService.findOneByNodeId(nodeId);
    if (user) {
      const result = user;
      return result;
    }
    return null;
  }

  async login(user: User, res: Response): Promise<UserResponseDTO> {
    const { name, nodeId, profileURL } = user;
    console.log(nodeId);
    const entity = await this.userService.findOneByNodeId(nodeId);
    console.log(entity);
    if (!entity) {
      console.log('noentity');
      console.log('abc: ', name, nodeId, profileURL);
      await this.userService.create(new UserCreateDTO(name, nodeId, profileURL));
    }
    const payload = { name, nodeId };
    const accessToken = this.jwtService.sign(payload);
    res.cookie('access_token', accessToken, {
      expires: new Date(Date.now() + 100 * 12 * 30 * 24 * 3600000),
      httpOnly: true,
    });

    return entity;
  }
}
