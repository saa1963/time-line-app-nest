import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TlStorage } from './TlStorage';
import fs1 = require('fs');
import path = require('path');

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
  Load(name: string, username: string): string {
    const fname = this.Fname(name, username);
    if (this.IsExist(name, username)) return fs1.readFileSync(fname, 'utf8');
    else throw new NotFoundException(`Не найден файл ${fname}`);
  }
  IsExist(name: string, username: string): boolean {
    return fs1.existsSync(this.Fname(name, username));
  }
  List(): string[] {
    return [];
  }
  Save(header: string, body: string): boolean {
    return true;
  }
}
