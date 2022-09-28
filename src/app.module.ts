import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TlFileStorage } from './TlFileStorage';
import { TlStorage } from './TlStorage';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: TlStorage,
      useClass: TlFileStorage,
    },
  ],
})
export class AppModule {}
