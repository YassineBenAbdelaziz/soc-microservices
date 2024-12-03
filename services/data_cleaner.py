import pandas as pd
import numpy as np
from database_connector import createDatabaseConnection


dataset = pd.read_csv('video_games.csv')


def printDatasetInfo() -> None :
	# Check data info
	dataset.info()	
	dataset.head()
	dataset.describe(include='all')

def renameColumns(dataset) -> None :
	dataset.rename(columns={
    'Year_of_Release': 'Year'}, inplace=True)


def dropNullRows(dataset) -> object :
	# Drop rows with missing values
	return dataset.dropna()


def formatData(dataset)  -> object :
    dataset['Title'] = dataset['Title'].str.strip().str.title()


def main() -> None:
	dataset = pd.read_csv('video_games.csv')
	renameColumns(dataset)
	dataset = dropNullRows(dataset)
	engine = createDatabaseConnection()
	dataset.to_sql("sales", engine, if_exists='replace', index=False)
	print("working")

 


if __name__ == '__main__':
	main()
