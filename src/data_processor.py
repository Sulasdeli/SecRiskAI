class DataProcessor:
    '''this class is used to process any incoming input for predictions'''

    def normalize(self, df):
        data = pd.read_csv("./train_test_dataset.csv")

        # Normalize using the initial dataframe -> bring the data for the prediction to the same scale
        normalized_df = prediction_df[features]
        for feature in features:
            normalized_df[feature] = normalized_df[feature].apply(
                lambda x: ((x - data[feature].min()) / (data[feature].max() - data[feature].min())))

        return normalized_df