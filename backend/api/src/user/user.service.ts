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
    this.userRepository.save(userCreateDTO);
  }

  findOne(id: string) {
    const entity = this.userRepository.findOneBy({ id });
    return plainToClass(UserResponseDTO, entity);
  }

  update(id: string, userUpdateDTO: UserUpdateDTO) {
    console.log(userUpdateDTO);
    return this.userRepository.update(id, userUpdateDTO);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}
