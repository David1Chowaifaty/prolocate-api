import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async login(email: string, password: string) {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return new Error('Invalid Email');
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) return new Error('Invalid Password');
    delete user.password;
    return user;
  }
}
