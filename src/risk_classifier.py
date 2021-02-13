import pandas as pd

from bentoml import env, artifacts, api, BentoService
from bentoml.adapters import DataframeInput
from bentoml.frameworks.sklearn import SklearnModelArtifact
from src.data_processor import DataProcessor
from src.const import prediction_result_mapping
import json

@env(infer_pip_packages=True)
@artifacts([SklearnModelArtifact('knn_model'),
            SklearnModelArtifact('mlp_model'),
            SklearnModelArtifact('svm_model'),
            SklearnModelArtifact('tree_model'),
            SklearnModelArtifact('scaler')])
class RiskClassifier(BentoService):
    """
    A prediction service exposing Scikit-learn models for Cybersecurity Risk Assessment
    """

    @api(input=DataframeInput(), batch=True)
    def predict(self, df: pd.DataFrame):
        """
        An inference API named `predict` with Dataframe input adapter, which codifies
        how HTTP requests or CSV files are converted to a pandas Dataframe object as the
        inference API function input
        """
        normalized_df = self.artifacts.scaler.transform(df)
        return [{
                "KNN": prediction_result_mapping[self.artifacts.knn_model.predict(normalized_df)[0]],
                "MLP": prediction_result_mapping[self.artifacts.mlp_model.predict(normalized_df)[0]],
                "SVM": prediction_result_mapping[self.artifacts.svm_model.predict(normalized_df)[0]],
                "DTree": prediction_result_mapping[self.artifacts.tree_model.predict(df)[0]]
            }]