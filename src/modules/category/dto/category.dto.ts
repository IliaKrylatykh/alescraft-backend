import { IsString } from 'class-validator';

export class CategoryDto {
  // @ApiProperty({ example: 'string' })
  @IsString()
  name: string;
}
