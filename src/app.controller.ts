import {
  Get,
  Controller,
  UseGuards,
  Req,
  Post,
  InternalServerErrorException,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DString } from './dstring.dto';
import { TlStorage } from './TlStorage';
import { Request } from 'express';
//import * as util from 'util';

@Controller()
export class AppController {
  constructor(private readonly storage: TlStorage) {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async getTest(@Req() req: Request): Promise<string> {
    const user = req.user as { userId: string; username: string };
    return user.username;
  }

  // curl http://localhost:3000/storage/list -H "Authorization: Bearer ..."
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getList(@Req() req: Request): Promise<string[]> {
    const user = req.user as { userId: string; username: string };
    return await this.storage.List(user.username);
  }

  // curl http://localhost:3000/storage/load?tlname=qwerty -H "Authorization: Bearer ..."
  @UseGuards(JwtAuthGuard)
  @Get('load')
  async getTL(@Req() req: Request): Promise<string> {
    const tlname: any = req.query['tlname'];
    const user = req.user as { userId: string; username: string };
    if (typeof tlname === 'string') {
      return await this.storage.Load(tlname, user.username);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveTL(@Req() req: Request, @Body() ob: DString): Promise<void> {
    try {
      const tlname: string = ob.s1;
      const tline: string = ob.s2;
      const user = req.user as { userId: string; username: string };
      await this.storage.Save(tlname, tline, user.username);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
