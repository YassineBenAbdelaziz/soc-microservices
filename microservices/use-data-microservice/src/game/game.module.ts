import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GET_DATA_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  providers: [GameResolver, GameService],
})
export class GameModule {}
