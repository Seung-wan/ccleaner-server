import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
