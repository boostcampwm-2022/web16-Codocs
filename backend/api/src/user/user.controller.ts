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

  @Get()
  @ApiOperation({ summary: '유저 목록 API', description: '유저 목록 API (테스트용)' })
  @ApiResponse({ description: '유저 목록', type: [UserResponseDTO] })
  findAll(): Promise<UserResponseDTO[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저 회원가입' })
  @ApiCreatedResponse({ description: '유저 생성됨' })
  create(@Body() userCreateDTO: UserCreateDTO) {
    return this.userService.create(userCreateDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 API', description: '해당 uuid 유저 정보 얻기' })
  @ApiCreatedResponse({ description: '유저 정보', type: UserResponseDTO })
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDTO {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '유저 정보 변경 API', description: '해당 uuid 유저 정보 변경하기' })
  @ApiResponse({ description: '변경됨' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() userUpdateDTO: UserUpdateDTO) {
    return this.userService.update(id, userUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제 API', description: '해당 uuid 유저 삭제하기' })
  @ApiResponse({ description: '삭제됨' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
