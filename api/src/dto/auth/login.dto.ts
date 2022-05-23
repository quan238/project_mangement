import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginDto;
