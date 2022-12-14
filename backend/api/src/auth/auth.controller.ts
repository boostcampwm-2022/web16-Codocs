import { Controller, Get, Post, Query, Redirect, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response): Promise<UserResponseDTO> {
    return this.authService.login(req.user, res);
  }

  @UseGuards(AuthGuard('github'))
  @Get('callback')
  @Redirect('http://localhost:3000/document/main', 301)
  async callback(@Request() req, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log('hi');
    return this.authService.login(req.user, res);
  }
}
