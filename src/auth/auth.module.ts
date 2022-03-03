import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtConfigService } from '../common/services/jwt-config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService })],
  providers: [AuthService, JwtStrategy, AuthMutationResolver],
})
export class AuthModule {}
