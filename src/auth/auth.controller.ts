/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Req, HttpException } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserStorage } from './auth.UserStorage';
import { LogonDto } from './logon.dto';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

//curl -X POST http://localhost:3000/auth/logon -d "{\"Login\": \"qqq\", \"Password\": \"222\"}" -H "Content-Type: application/json"

@Controller('auth')
export class UsersController {
  constructor(private readonly userStorage: UserStorage, private readonly jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logoutUser(): boolean {
    // logout
    return true;
  }

  @Post('newuser')
  async regusterUser(@Body() registerDto: RegisterDto): Promise<void> {
    if (!await this.userStorage.Save(registerDto.Login, registerDto.Email, registerDto.Password1)) {
      throw new HttpException('Ошибка регистрации', 500);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('logon')
  async logonUser1(@Req() req) {
    // если Guard пройден, то к req присоединено свойство user (то что возвращает LocalStrategy.validate())
    const user: LogonDto = req.user;
    const payload = { username: user.Login };
    const token = { access_token: this.jwtService.sign(payload) };
    return token;
  }
}
