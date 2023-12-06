import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import type { LoginStrategy } from '@/auth';

import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class KakaoStrategy implements LoginStrategy {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {}

  async login(code: string) {
    const data = await this.getToken(code);

    const user = await this.getUser(data.data.access_token);

    const isExist = await this.prismaService.user.findUnique({
      where: {
        email: user.kakao_account.email,
      },
    });

    if (isExist) {
      return {
        token: '12321321j3lk12j3kl213j',
      };
    }

    await this.prismaService.user.create({
      data: {
        nickname: user.properties.nickname,
        description: '',
        email: user.kakao_account.email,
        image_url: user.properties.thumbnail_image,
      },
    });

    return {
      token: '123123123',
    };
  }

  async getToken(code: string) {
    try {
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get('KAKAO_ID'),
          redirect_id: this.configService.get('KAKAO_REDIRECT_URI'),
          code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(accessToken: string) {
    const { data } = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    return data;
  }
}
