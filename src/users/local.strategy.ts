import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CurrentUser } from 'src/models/current.user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CurrentUser> {
    let user = await this.userService.validateUserCredentials(email, password);

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
