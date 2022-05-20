import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GendersModule } from './genders/genders.module';

@Module({
  imports: [UserModule, PrismaModule, GendersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
