import { Module } from '@nestjs/common';
import { PassportModule  } from '@nestjs/passport';
import { JwtModule,  } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordProvider } from 'src/providers/password';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s'},
    }),
  ],
  providers: [
    AuthService, 
    UserService,
    PasswordProvider,
    PrismaService,
    LocalStrategy, 
    JwtStrategy,
  ],
  exports: [
    AuthService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
