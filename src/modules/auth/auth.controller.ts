import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from './types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: AuthResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @ApiOkResponse({ type: AuthResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiOkResponse({ type: AuthResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('tokens')
  async getNewTokens(@Body() dto: refreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
