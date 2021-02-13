from .const import FEATURES
import pandas as pd

class DataProcessor:
    '''this class is used to process any incoming input for predictions'''

    def __init__(self, train_test_df):
        self.train_test_df=train_test_df

    def normalize(self, df):
        data = self.train_test_df
        # Normalize using the initial dataframe -> bring the data for the prediction to the same scale
        normalized_df = df[FEATURES]
        for feature in FEATURES:
            normalized_df[feature] = normalized_df[feature].apply(
                lambda x: ((x - data[feature].min()) / (data[feature].max() - data[feature].min())))

        return normalized_df