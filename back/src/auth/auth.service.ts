import {
    Injectable,
    UnauthorizedException,
    NotAcceptableException,
    BadRequestException
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { UserService } from 'src/user/user.service';
  import * as bcrypt from 'bcrypt';
  @Injectable()
  export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService,
    ) {}
  
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.userService.findByUsername(username);
      if (user) {
        const passwordIsValid = await bcrypt.compare(pass, user.password);
        if (passwordIsValid) {
          const { password, ...result } = user;
          return this.generateToken(user.username, user.id);
        }
      }
      return null
    }
  
    async login(username: string, userId: string) {
      const payload = { username: username, sub: userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  
    async generateToken(username: string, userId: string) {
      return {
        access_token: await this.jwtService.signAsync({
          username: username,
          expiresIn: '60s',
          sub: userId,
        }),
      };
    }
  
    async refreshToken(token: string){
      try {
        const tokenDecode = await this.jwtService.verifyAsync(token)
        const payload = { username: tokenDecode.username, sub: tokenDecode.sub};
        return {
          access_token: this.jwtService.sign(payload)
        }
      }catch(error){
        throw new BadRequestException("invalidated Token")
      }
    }
  }
  