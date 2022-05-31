import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StorageController } from './storage.controller';
import { TlFileStorage } from './TlFileStorage';
import { TlStorage } from './TlStorage';

@Module({
  imports: [AuthModule],
  controllers: [StorageController],
  providers: [
    {
      provide: TlStorage,
      useClass: TlFileStorage,
    },
  ],
})
export class StorageModule {}
