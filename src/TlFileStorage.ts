import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TlStorage } from './TlStorage';
import fs1 = require('fs/promises');
import path = require('path');
import constants = require('constants');

@Injectable()
export class TlFileStorage extends TlStorage {
  private basePath: string;
  constructor(private configService: ConfigService) {
    super();
    this.basePath = configService.get<string>('TLA_WORKPLACE');
  }
  private Fname(name: string, username: string): string {
    return path.join(this.basePath, username + '.' + name + '.json');
  }
  async Load(name: string, username: string): Promise<string> {
    const fname = this.Fname(name, username);
    if (await this.IsExist(name, username)) return await fs1.readFile(fname, 'utf8');
    else throw new NotFoundException(`Не найден файл ${fname}`);
  }
  async IsExist(name: string, username: string): Promise<boolean> {
    try {
      await fs1.access(this.Fname(name, username), constants.R_OK | constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }
  async List(user: string): Promise<string[]> {
    const re = new RegExp('^' + user + '..*.json$');
    const files = await fs1.readdir(this.basePath, {
      encoding: 'utf-8',
      withFileTypes: true,
    });
    return files
      .filter((value) => {
        return value.isFile() && re.test(value.name);
      })
      .map((vl) => {
        return vl.name.substring(vl.name.indexOf('.') + 1, vl.name.lastIndexOf('.json'));
      });
  }
  async Save(header: string, body: string, username: string): Promise<boolean> {
    await fs1.writeFile(this.Fname(header, username), body, { encoding: 'utf-8' });
    return true;
  }
}
