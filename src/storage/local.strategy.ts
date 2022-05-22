/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserStorage } from './UserStorage';
import { LogonDto } from 'src/dto/logon.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserStorage) {
    super({usernameField: 'Login', passwordField: 'Password'});
  }

  async validate(username: string, password: string): Promise<any> {
    const user: LogonDto = await this.authService.Logon(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {Password, ...result} = user;
    return result;
  }
}