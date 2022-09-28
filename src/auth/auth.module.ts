import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { FileUserStorage } from './auth.FileUserStorage';
import { LocalStrategy } from './local.strategy';
import { UsersController } from './auth.controller';
import { UserStorage } from './auth.UserStorage';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UserStorage,
      useClass: FileUserStorage,
    },
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
