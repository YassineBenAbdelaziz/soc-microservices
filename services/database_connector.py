import dotenv
from sqlalchemy import create_engine, URL



def createDatabaseConnection() -> object:
    url = URL.create(
            drivername='postgresql+psycopg2',
            username='postgres',
            password='',
            host='localhost',
            port='5432',
            database='games_sales'
            )

    engine = create_engine(url)
    return engine




