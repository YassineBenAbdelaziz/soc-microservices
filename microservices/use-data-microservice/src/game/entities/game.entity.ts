import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field(() => Int)
  index: number;

  @Field()
  name: string;

  @Field()
  platform: string;

  @Field(() => Float, { nullable: true })
  year?: number;

  @Field()
  genre: string;

  @Field()
  publisher: string;

  @Field(() => Float, { nullable: true })
  na_sales?: number;

  @Field(() => Float, { nullable: true })
  eu_sales?: number;

  @Field(() => Float, { nullable: true })
  jp_sales?: number;

  @Field(() => Float, { nullable: true })
  other_sales?: number;

  @Field(() => Float, { nullable: true })
  global_sales?: number;

  @Field(() => Float, { nullable: true })
  critic_score?: number;

  @Field(() => Int, { nullable: true })
  critic_count?: number;

  @Field({ nullable: true })
  user_score?: string;

  @Field(() => Int, { nullable: true })
  user_count?: number;

  @Field({ nullable: true })
  developer?: string;

  @Field({ nullable: true })
  rating?: string;
}

@ObjectType()
export class TotalSalesByGenre {
  @Field()
  genre: string;

  @Field(() => Float)
  total_sales: number;
}
