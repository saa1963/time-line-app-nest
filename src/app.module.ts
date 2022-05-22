import { Module } from '@nestjs/common';
import { FileUserStorage } from './storage/FileUserStorage';
import { UserStorage } from './storage/UserStorage';
import { UsersController } from './users/users.controller';
import { TlStorage } from './storage/TlStorage';
import { TlFileStorage } from './storage/TlFileStorage';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './storage/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UserStorage,
      useClass: FileUserStorage,
    },
    {
      provide: TlStorage,
      useClass: TlFileStorage,
    },
    LocalStrategy,
  ],
})
export class AppModule {}
