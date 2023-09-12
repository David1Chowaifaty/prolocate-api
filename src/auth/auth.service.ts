import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/DTO/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private user: UsersService, private jwtService: JwtService) {}

  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.user.login(email, password);
      const payload = {
        sub: user.userId,
        username: user.name,
        role: user.userType,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
