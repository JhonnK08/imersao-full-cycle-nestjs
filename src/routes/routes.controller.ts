import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteSerializer } from './route.serializer';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    const route = await this.routesService.create(createRouteDto);
    return new RouteSerializer(route);
  }

  @Get()
  async findAll() {
    const routes = await this.routesService.findAll();

    return routes.map((route) => new RouteSerializer(route));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const route = await this.routesService.findOne(id);
    return new RouteSerializer(route);
  }
}
