import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Float, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import strawberry
from strawberry.asgi import GraphQL
from fastapi import FastAPI
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class GameModel(Base):
    __tablename__ = "sales"

    index = Column("Index", Integer, primary_key=True, index=True)
    name = Column("Name", String, index=True)
    platform = Column("Platform", String)
    year = Column("Year", Float)
    genre = Column("Genre", String)
    publisher = Column("Publisher", String)
    na_sales = Column("NA_Sales", Float)
    eu_sales = Column("EU_Sales", Float)
    jp_sales = Column("JP_Sales", Float)
    other_sales = Column("Other_Sales", Float)
    global_sales = Column("Global_Sales", Float)
    critic_score = Column("Critic_Score", Float)
    critic_count = Column("Critic_Count", Integer)
    user_score = Column("User_Score", String)
    user_count = Column("User_Count", Integer)
    developer = Column("Developer", String)
    rating = Column("Rating", String)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@strawberry.type
class TotalSalesByGenre:
    genre: str
    total_sales: float


@strawberry.type
class Game:
    index: int
    name: str
    platform: str
    year: Optional[float]
    genre: str
    publisher: str
    na_sales: Optional[float]
    eu_sales: Optional[float]
    jp_sales: Optional[float]
    other_sales: Optional[float]
    global_sales: Optional[float]
    critic_score: Optional[float]
    critic_count: Optional[float]
    user_score: Optional[str]
    user_count: Optional[float]
    developer: Optional[str]
    rating: Optional[str]


@strawberry.type
class Query:
    @strawberry.field
    def games(self, skip: int = 0, limit: int = 10) -> List[Game]:
        with SessionLocal() as db:
            game_models = db.query(GameModel).offset(skip).limit(limit).all()
            return [
                Game(
                    index=game.index,
                    name=game.name,
                    platform=game.platform,
                    year=game.year,
                    genre=game.genre,
                    publisher=game.publisher,
                    na_sales=game.na_sales,
                    eu_sales=game.eu_sales,
                    jp_sales=game.jp_sales,
                    other_sales=game.other_sales,
                    global_sales=game.global_sales,
                    critic_score=game.critic_score,
                    critic_count=game.critic_count,
                    user_score=game.user_score,
                    user_count=game.user_count,
                    developer=game.developer,
                    rating=game.rating,
                )
                for game in game_models
            ]

    @strawberry.field
    def game_by_id(self, id: int) -> Optional[Game]:
        with SessionLocal() as db:
            game_model = db.query(GameModel).filter(GameModel.index == id).first()
            if game_model:
                return Game(
                    index=game_model.index,
                    name=game_model.name,
                    platform=game_model.platform,
                    year=game_model.year,
                    genre=game_model.genre,
                    publisher=game_model.publisher,
                    na_sales=game_model.na_sales,
                    eu_sales=game_model.eu_sales,
                    jp_sales=game_model.jp_sales,
                    other_sales=game_model.other_sales,
                    global_sales=game_model.global_sales,
                    critic_score=game_model.critic_score,
                    critic_count=game_model.critic_count,
                    user_score=game_model.user_score,
                    user_count=game_model.user_count,
                    developer=game_model.developer,
                    rating=game_model.rating,
                )
            return None

    @strawberry.field
    def total_sales_by_genre(self) -> List[TotalSalesByGenre]:
        with SessionLocal() as db:
            results = (
                db.query(
                    GameModel.genre,
                    func.sum(GameModel.global_sales).label("total_sales"),
                )
                .group_by(GameModel.genre)
                .all()
            )
            return [
                TotalSalesByGenre(genre=result.genre, total_sales=result.total_sales)
                for result in results
            ]

    @strawberry.field
    def top_games_by_critic_score(self, top_n: int = 10) -> List[Game]:
        with SessionLocal() as db:
            game_models = (
                db.query(GameModel)
                .order_by(GameModel.critic_score.desc())
                .limit(top_n)
                .all()
            )
            return [
                Game(
                    index=game.index,
                    name=game.name,
                    platform=game.platform,
                    year=game.year,
                    genre=game.genre,
                    publisher=game.publisher,
                    na_sales=game.na_sales,
                    eu_sales=game.eu_sales,
                    jp_sales=game.jp_sales,
                    other_sales=game.other_sales,
                    global_sales=game.global_sales,
                    critic_score=game.critic_score,
                    critic_count=game.critic_count,
                    user_score=game.user_score,
                    user_count=game.user_count,
                    developer=game.developer,
                    rating=game.rating,
                )
                for game in game_models
            ]


schema = strawberry.Schema(query=Query)
graphql_app = GraphQL(schema)

app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
