import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @EventPattern('game_created')
  create(data: CreateGameDto) {
    this.gameService.create(data);
  }

  @MessagePattern({ cmd: 'get_games' })
  findAll(data: { skip: number; limit: number }) {
    return this.gameService.findAll(data.skip, data.limit);
  }

  @MessagePattern({ cmd: 'get_game' })
  findOne(data: { id: string }): Promise<Game> {
    return this.gameService.findOne(+data.id);
  }

  @MessagePattern({ cmd: 'update_game' })
  update(data: { id: string; updateGameDto: UpdateGameDto }): Promise<Game> {
    return this.gameService.update(+data.id, data.updateGameDto);
  }

  @MessagePattern({ cmd: 'remove_game' })
  remove(data: { id: string }): Promise<Game> {
    return this.gameService.remove(+data.id);
  }
}
