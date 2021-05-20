import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy';
import { User } from './user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'My random secret key never let others',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PassportModule
  ],
  providers: [UsersService, LocalStrategy],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
