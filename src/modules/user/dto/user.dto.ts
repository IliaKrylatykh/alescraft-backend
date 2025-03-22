import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'test@test.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test1234' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  avatar: string;
}
