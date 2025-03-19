import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET') as string,
    });
  }

  async validate({ id }: Pick<User, 'id'>) {
    console.log('JWT Payload ID:', id); // Логируем ID из токена

    const user = await this.prisma.user.findUnique({ where: { id: +id } });

    console.log('User found:', user); // Логируем найденного пользователя

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return user;
  }
}
