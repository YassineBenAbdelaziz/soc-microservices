export class CreateGameDto {
  name: string;
  platform: string;
  year?: number;
  genre: string;
  publisher: string;
  naSales?: number;
  euSales?: number;
  jpSales?: number;
  otherSales?: number;
  globalSales?: number;
  criticScore?: number;
  criticCount?: number;
  userScore?: string;
  userCount?: number;
  developer?: string;
  rating?: string;
}
