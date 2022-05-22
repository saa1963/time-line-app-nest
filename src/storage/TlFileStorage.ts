import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TlStorage } from './TlStorage';

@Injectable()
export class TlFileStorage implements TlStorage {
  private basePath: string;
  constructor(private configService: ConfigService) {
    this.basePath = configService.get<string>('TLA_WORKPLACE');
  }
  Load(name: string): string {
    return '';
  }
  IsExist(name: string): boolean {
    return true;
  }
  List(): string[] {
    return [];
  }
  Save(header: string, body: string): boolean {
    return true;
  }
}
