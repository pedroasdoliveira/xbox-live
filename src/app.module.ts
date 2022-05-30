import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GendersModule } from './genders/genders.module';
import { GamesModule } from './games/games.module';
import { ProfileModule } from './profile/profile.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [UserModule, PrismaModule, GendersModule, GamesModule, ProfileModule, HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
