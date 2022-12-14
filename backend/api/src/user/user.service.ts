import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserUpdateDTO } from './dto/user-update.dto';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  create(userCreateDTO: UserCreateDTO) {
    console.log(userCreateDTO);
    this.userRepository.save(userCreateDTO);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((entity) => plainToClass(UserResponseDTO, entity));
  }

  findOne(id: string) {
    const entity = this.userRepository.findOneBy({ id });
    return plainToClass(UserResponseDTO, entity);
  }

  findOneByNodeId(nodeId: string) {
    const entity = this.userRepository.findOneBy({ nodeId });
    return plainToClass(UserResponseDTO, entity);
  }

  update(id: string, userUpdateDTO: UserUpdateDTO) {
    return this.userRepository.update(id, userUpdateDTO);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}
