import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateUpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  avatarUrl: string;
}

export default CreateUpdateUserDto;
