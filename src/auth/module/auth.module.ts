import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/db/prisma.service';

import { AuthController } from '@/auth/controller/auth.controller';
import { AuthService } from '@/auth/service/auth.service';
import { AuthRepository } from '@/auth/repository/auth.repository';
import { KakaoStrategy } from '@/auth/strategy/kakao.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    KakaoStrategy,
    PrismaService,
    ConfigService,
  ],
})
export class AuthModule {}
