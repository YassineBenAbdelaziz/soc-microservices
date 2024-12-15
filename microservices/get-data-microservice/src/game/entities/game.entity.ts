import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class Game {
  @PrimaryGeneratedColumn({ name: 'Index' })
  index: number;

  @Column({ type: 'text', name: 'Name' })
  name: string;

  @Column({ type: 'text', name: 'Platform' })
  platform: string;

  @Column({ type: 'double precision', nullable: true, name: 'Year' })
  year: number;

  @Column({ type: 'text', name: 'Genre' })
  genre: string;

  @Column({ type: 'text', name: 'Publisher' })
  publisher: string;

  @Column({ type: 'double precision', nullable: true, name: 'NA_Sales' })
  naSales: number;

  @Column({ type: 'double precision', nullable: true, name: 'EU_Sales' })
  euSales: number;

  @Column({ type: 'double precision', nullable: true, name: 'JP_Sales' })
  jpSales: number;

  @Column({ type: 'double precision', nullable: true, name: 'Other_Sales' })
  otherSales: number;

  @Column({ type: 'double precision', nullable: true, name: 'Global_Sales' })
  globalSales: number;

  @Column({ type: 'double precision', nullable: true, name: 'Critic_Score' })
  criticScore: number;

  @Column({ type: 'double precision', nullable: true, name: 'Critic_Count' })
  criticCount: number;

  @Column({ type: 'text', nullable: true, name: 'User_Score' })
  userScore: string;

  @Column({ type: 'double precision', nullable: true, name: 'User_Count' })
  userCount: number;

  @Column({ type: 'text', nullable: true, name: 'Developer' })
  developer: string;

  @Column({ type: 'text', nullable: true, name: 'Rating' })
  rating: string;
}
