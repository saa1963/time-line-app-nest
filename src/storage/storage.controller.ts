import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DString } from './dstring.dto';
import { TlStorage } from './TlStorage';

@Controller('storage')
export class StorageController {
  constructor(private readonly storage: TlStorage) {}

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
  async saveTL(@Req() req: Request, ob: DString): Promise<void> {
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
