import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { RegisterDTO } from 'src/DTO/auth.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async login(email: string, password: string) {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new Error('Invalid Email');
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid Password');
    delete user.password;
    return user;
  }

  async register(user: RegisterDTO) {
    const hashedPassword = await hash(user.password, 10);
    const newUser = await this.db.user.create({
      data: { ...user, password: hashedPassword },
    });
    delete newUser.password;
    return newUser;
  }
}
