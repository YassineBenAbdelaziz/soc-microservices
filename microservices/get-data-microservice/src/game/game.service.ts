import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const newGame = this.gamesRepository.create(createGameDto);
    return await this.gamesRepository.save(newGame);
  }

  async findAll(skip: number, limit: number): Promise<Game[]> {
    console.log('findAll() from get-data-microservice called');
    return await this.gamesRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(index: number): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { index } });
    if (!game) {
      throw new NotFoundException(`Game with index ${index} not found`);
    }
    return game;
  }

  async update(index: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(index);
    if (!game) {
      throw new NotFoundException(`Game with index ${index} not found`);
    }
    Object.assign(game, updateGameDto);
    return await this.gamesRepository.save(game);
  }

  async remove(index: number): Promise<Game> {
    const game = await this.findOne(index);
    if (!game) {
      throw new NotFoundException(`Game with index ${index} not found`);
    }
    await this.gamesRepository.remove(game);
    return game;
  }
}
