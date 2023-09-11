import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PasswordProvider } from 'src/providers/password';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UserService, PasswordProvider, PrismaService, AuthService, JwtService
  ],
  exports: [UserService, UserModule],
})
export class UserModule {}
