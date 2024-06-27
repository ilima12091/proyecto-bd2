import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
