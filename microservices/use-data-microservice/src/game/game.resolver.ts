import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Game, TotalSalesByGenre } from './entities/game.entity';
import { GameService } from './game.service';

@Resolver(() => Game)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => [Game])
  async games(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.gameService.findAll(skip, limit);
  }

  @Query(() => Game, { nullable: true })
  async gameById(@Args('id', { type: () => Int }) id: number) {
    return this.gameService.findById(id);
  }
}
