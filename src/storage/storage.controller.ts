import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TlStorage } from './TlStorage';

@Controller('storage')
export class StorageController {
  constructor(private readonly storage: TlStorage) {}

  @Get('list')
  er(): boolean {
    // logout
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get('load')
  getTL(@Req() req: Request): string {
    const tlname: any = req.query['tlname'];
    const user = req.user as { userId: string; username: string };
    if (typeof tlname === 'string') {
      return this.storage.Load(tlname, user.username);
    }
  }
}
