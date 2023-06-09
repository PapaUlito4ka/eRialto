import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto, SignUpAuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshJwtAuthGuard } from './refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() authDto: SignUpAuthDto) {
    return this.authService.signUp(authDto);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
