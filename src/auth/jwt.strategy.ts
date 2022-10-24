import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    //UserRepositoryをDI
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Requestのどの部分にjwtが記述されているか
      ignoreExpiration: false, // jwtの有効期限切れを許容する
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findUserByPayload({ id, username });

    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
