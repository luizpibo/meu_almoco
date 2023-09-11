import { Controller, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';


interface userLoginRequestDTO{
    username: string,
    password: string,
}
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    async login (@Request() req: any){
        console.log("Passando pela rota de login dentro do auth controller")
        console.log("dados do usuarios dentro da requisicao", req.user)
        return this.authService.login(req.user.username, req.user.password);
    }

    @Post('refresh')
    @Public()
    async refreshToken(@Query('token') token: string){
        const tokenToRefresh = token;
        return this.authService.refreshToken(tokenToRefresh);
    }
}
