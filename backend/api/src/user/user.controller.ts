import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userCreateDTO: UserCreateDTO) {
    return this.userService.create(userCreateDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserResponseDTO {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdateDTO: UserUpdateDTO) {
    return this.userService.update(id, userUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
