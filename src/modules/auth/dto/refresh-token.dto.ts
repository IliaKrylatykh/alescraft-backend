import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class refreshTokenDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  refreshToken: string;
}
