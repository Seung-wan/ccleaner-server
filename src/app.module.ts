import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@/prisma.service';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { PostService } from '@/post.service';

import { UserService } from '@/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule {}
