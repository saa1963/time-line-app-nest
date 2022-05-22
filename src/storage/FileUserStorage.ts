import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserStorage } from './UserStorage';
import path = require('path');
import fs = require('fs');
import readline = require('readline');
import { LogonDto } from 'src/dto/logon.dto';

@Injectable()
export class FileUserStorage extends UserStorage {
  private filePath: string;
  constructor(private configService: ConfigService) {
    super();
    this.filePath = path.join(
      this.configService.get<string>('TLA_WORKPLACE'),
      'user.dat',
    );
    if (fs.existsSync(this.filePath)) {
      const fileStream = fs.createReadStream(this.filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
      rl.on('line', (line) => {
        const ms = line.split('^');
        if (ms && ms.length === 3) {
          this.logonDto.push({ Login: ms[0], Password: ms[2] });
        }
      });
    }
  }
  async Save(login: string, email: string, password: string): Promise<boolean> {
    if (await this.Contains(login)) {
      return false;
    }
    fs.appendFileSync(
      this.filePath,
      login + '^' + email + '^' + password + '\n',
    );
    this.logonDto.push({ Login: login, Password: password });
    return true;
  }
  async Contains(login: string): Promise<boolean> {
    return (
      this.logonDto.findIndex(
        (value) => value.Login.toUpperCase() === login.toUpperCase(),
      ) !== -1
    );
  }
  async Remove(login: string): Promise<boolean> {
    if (!(await this.Contains(login))) {
      return false;
    }
    return true;
  }
  async Logon(login: string, password: string): Promise<LogonDto | null> {
    const idx = this.logonDto.findIndex(
      (value) =>
        value.Login.toUpperCase() === login.toUpperCase() &&
        value.Password === password,
    );
    if (idx !== -1) {
      return this.logonDto[idx];
    } else {
      return null;
    }
  }
}
