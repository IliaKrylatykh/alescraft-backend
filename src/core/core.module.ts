import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
