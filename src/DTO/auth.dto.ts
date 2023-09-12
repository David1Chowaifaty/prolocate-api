import { IsEmail, IsString } from 'class-validator';
class AuthDTO {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
export class RegisterDTO extends AuthDTO {
  @IsString()
  name: string;
  @IsString()
  userType: string;
}
export class LoginDTO extends AuthDTO {}
