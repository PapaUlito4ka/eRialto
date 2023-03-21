import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpAuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const passwordHash = await bcrypt.hash(password, user.salt);

    if (passwordHash === user.passwordHash) {
      const { passwordHash, salt, ...userData } = user;
      return userData;
    }
    return null;
  }

  async signIn(user: any) {
    const accessPayload = {
      sub: user.id,
      email: user.email,
      isRefresh: false
    };
    const refreshPayload = {
      sub: user.id,
      email: user.email,
      isRefresh: true
    };

    return {
      access_token: this.jwtService.sign(accessPayload, {
        expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXP_TIME')}s`
      }),
      refresh_token: this.jwtService.sign(refreshPayload, {
        expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXP_TIME')}s`
      })
    };
  }

  async signUp(authDto: SignUpAuthDto) {
    return await this.userService.create(authDto);
  }

  async refresh(user: any) {
    const accessPayload = {
      sub: user.id,
      email: user.email,
      isRefresh: false
    };

    return {
      access_token: this.jwtService.sign(accessPayload, {
        expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXP_TIME')}s`
      })
    };
  }
}
