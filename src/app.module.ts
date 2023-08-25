import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapsModule } from './maps/maps.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    RoutesModule,
    MapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
