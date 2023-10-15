import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cartfit',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    MulterModule.register({
      dest: './uploads',
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private datasource: DataSource) { }
}
