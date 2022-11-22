import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저 회원가입' })
  @ApiCreatedResponse({ description: '유저가 생성되었다.', type: UserResponseDTO })
  create(@Body() userCreateDTO: UserCreateDTO) {
    return this.userService.create(userCreateDTO);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDTO {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() userUpdateDTO: UserUpdateDTO) {
    return this.userService.update(id, userUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
