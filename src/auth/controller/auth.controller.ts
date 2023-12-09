import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@/auth/service/auth.service';
import { KakaoStrategy } from '@/auth/strategy/kakao.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly kakaoStrategy: KakaoStrategy
  ) {}

  @Post('/kakao/login')
  async login(@Body() { code }: { code: string }) {
    const res = await this.authService.login({
      code,
      loginStrategy: this.kakaoStrategy,
    });

    return res;
  }
}
