import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [],
  providers: [UserResolver, UserService]
})
export class UserModule {}
