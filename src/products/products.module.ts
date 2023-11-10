import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { Products } from './product.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, User]),
  JwtModule.register({
    secret: jwtConstants.secret,
  })
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UserService]
})
export class ProductsModule { }
