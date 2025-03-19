import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductModule } from 'src/modules/product/product.module';
import { PaginationModule } from 'src/modules/pagination/pagination.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    PaginationModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
