import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { SignInInput, SignUpInput } from '../auth.inputs';
import { SignInPayload, SignUpPayload } from '../auth.payloads';
import { JwtPayload } from '../common/auth.types';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUp(dto: SignUpInput): Promise<SignUpPayload> {
    const isUserExists = await UserEntity.query()
      .where({ username: dto.username })
      .resultSize();

    if (isUserExists) {
      return { problem: 'User with this username already exists' };
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = await UserEntity.query().insertAndFetch({
      username: dto.username,
      password: hashedPassword,
    });

    const token = this.generateJwtToken(newUser);

    return { user: UserModel.createFromEntity(newUser), token };
  }

  async signIn(dto: SignInInput): Promise<SignInPayload> {
    const user = await UserEntity.query().findOne({
      username: dto.username,
    });

    const isPasswordCorrect = await this.comparePasswords(
      dto.password,
      user.password,
    );

    if (!user || !isPasswordCorrect) {
      throw new ForbiddenException(`Incorrect email or password`);
    }

    const token = this.generateJwtToken(user);

    return { user: UserModel.createFromEntity(user), token };
  }

  private generateJwtToken(user: UserEntity): string {
    const jwtPayload: JwtPayload = { sub: user.id };
    const token = this.jwtService.sign(jwtPayload);

    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private async comparePasswords(
    pretend: string,
    actual: string,
  ): Promise<boolean> {
    return compare(pretend, actual);
  }
}
