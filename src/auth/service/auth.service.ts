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
    const res = await loginStrategy.login(code);

    return res;
  }
}
