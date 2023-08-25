import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MapsModule } from 'src/maps/maps.module';
import { NewPointsConsumer } from './new-points.consumer';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RoutesGateway } from './routes/routes.gateway';

@Module({
  imports: [MapsModule, BullModule.registerQueue({ name: 'new-points' })],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    RoutesDriverService,
    RoutesGateway,
    NewPointsConsumer,
  ],
})
export class RoutesModule {}
