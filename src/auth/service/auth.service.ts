import { Injectable } from '@nestjs/common';

import type { LoginStrategy } from '@/auth';

@Injectable()
export class AuthService {
  async login({
    code,
    loginStrategy,
  }: {
    code: string;
    loginStrategy: LoginStrategy;
  }) {
    await loginStrategy.login(code);
  }
}
