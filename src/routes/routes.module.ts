import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { MapsModule } from 'src/maps/maps.module';
import { NewPointsJob } from './new-points.job';
import { RouteKafkaProducerJob } from './route-kafka-producer.job';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RoutesGateway } from './routes/routes.gateway';

@Module({
  imports: [
    MapsModule,
    BullModule.registerQueue(
      { name: 'new-points' },
      { name: 'kafka-producer' },
    ),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: ['host.docker.internal:9094'],
          },
        },
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    RoutesDriverService,
    RoutesGateway,
    NewPointsJob,
    RouteKafkaProducerJob,
    makeCounterProvider({
      name: 'route_started_counter',
      help: 'Number of routes started',
    }),
    makeCounterProvider({
      name: 'route_finished_counter',
      help: 'Number of routes finished',
    }),
  ],
})
export class RoutesModule {}
