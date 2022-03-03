import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignInInput, SignUpInput } from '../auth.inputs';
import { SignInPayload, SignUpPayload } from '../auth.payloads';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpPayload, { name: 'auth_signUp' })
  async signUp(@Args('input') input: SignUpInput): Promise<SignUpPayload> {
    return this.authService.signUp(input);
  }

  @Mutation(() => SignInPayload, { name: 'auth_signIn' })
  async signIn(@Args('input') input: SignInInput): Promise<SignInPayload> {
    return this.authService.signIn(input);
  }

  // @Mutation(() => null, { name: 'auth_restorePassword' })
  // async restorePassword() {
  //   return null;
  // }
}
