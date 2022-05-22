import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from 'src/dto/register.dto';
import { UserStorage } from 'src/storage/UserStorage';
import { AuthGuard } from '@nestjs/passport';
import { LogonDto } from 'src/dto/logon.dto';
import { JwtService } from '@nestjs/jwt';

//curl -X POST http://localhost:3000/api/register/log -d "{\"Login\": \"qqq\", \"Password\": \"222\"}" -H "Content-Type: application/json"

@Controller('api/register')
export class UsersController {
  constructor(
    private readonly userStorage: UserStorage,
    private readonly jwtService: JwtService,
  ) {}

  @Get('logout')
  logoutUser(): boolean {
    // logout
    return true;
  }

  @Post('reg')
  regusterUser(@Body() registerDto: RegisterDto): string {
    if (
      this.userStorage.Save(
        registerDto.Login,
        registerDto.Email,
        registerDto.Password1,
      )
    )
      return '';
    else return 'Неудачная регистрация пользователя';
  }

  @UseGuards(AuthGuard('local'))
  @Post('log')
  async logonUser1(@Req() req) {
    // если Guard пройден, то к req присоединено свойство user (то что возвращает LocalStrategy.validate())
    const user: LogonDto = req.user;
    const payload = { username: user.Login };
    const token = { access_token: this.jwtService.sign(payload) };
    return token;
  }
}
