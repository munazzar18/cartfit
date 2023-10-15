import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { Products } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products]),
  JwtModule.register({
    secret: jwtConstants.secret,
  })
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
