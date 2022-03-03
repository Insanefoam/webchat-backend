import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtPayload } from '../common/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await UserEntity.query().findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid JWT');
    }

    return user;
  }
}
