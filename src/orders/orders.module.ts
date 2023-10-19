import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]),
  JwtModule.register({
    secret: jwtConstants.secret
  })
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
