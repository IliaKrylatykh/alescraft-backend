import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example: {
      id: 1,
      email: 'string',
    },
  })
  user: {
    id: number;
    email: string;
  };

  @ApiProperty({ example: 'string' })
  accessToken: string;

  @ApiProperty({ example: 'string' })
  refreshToken: string;
}
