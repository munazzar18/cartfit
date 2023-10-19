import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './auth/registerUser.dto';
import { sendJson } from './helpers/helpers';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user)
    return sendJson(true, 'user login successfully', {
      access_token: token.access_token
    })
  }

  @Post('auth/register')
  async register(@Body() data: RegisterUserDto) {
    const token = await this.authService.register(data);
    return sendJson(true, 'user register successfully', {
      access_token: token.access_token
    })
  }
}
