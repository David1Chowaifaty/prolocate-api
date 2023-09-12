import { Controller, Post, Body } from '@nestjs/common';
import { LoginDTO } from 'src/DTO/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() body: LoginDTO) {
    this.authService.login(body);
  }
}
