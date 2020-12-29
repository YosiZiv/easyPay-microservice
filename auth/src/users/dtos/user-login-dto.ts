import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class userLoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
