import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GameService {
  constructor(
    @Inject('GET_DATA_SERVICE') private readonly getDataClient: ClientProxy,
  ) {}

  findAll(skip: number = 0, limit: number = 10) {
    console.log('getGames() from use-data-microservice called');
    const result = this.getDataClient.send(
      { cmd: 'get_games' },
      { skip, limit },
    );
    return result;
  }

  findById(id: number) {
    const result = this.getDataClient.send({ cmd: 'get_game' }, { id });
    return result;
  }
}
