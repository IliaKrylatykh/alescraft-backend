import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: result.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = this.issueTokens(user.id);
      return { ...this.returnUserFields(user), ...tokens };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { ...this.returnUserFields(user), ...tokens };
  }

  async register(dto: AuthDto) {
    const existsUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existsUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        name: Math.floor(Math.random() * 1000000).toString(),
      },
    });

    const tokens = this.issueTokens(user.id);
    return { user: this.returnUserFields(user), ...tokens };
  }

  private issueTokens(userId: number) {
    const data = { id: userId };

    return {
      accessToken: this.jwt.sign(data, { expiresIn: '1h' }),
      refreshToken: this.jwt.sign(data, { expiresIn: '7d' }),
    };
  }

  private returnUserFields(user: User) {
    return { id: user.id, email: user.email };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
