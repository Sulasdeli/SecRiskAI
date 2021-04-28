import pandas as pd

from bentoml import env, artifacts, api, BentoService
from bentoml.frameworks.sklearn import SklearnModelArtifact
from bentoml.adapters import JsonInput

columns = ["invested_amount", "successful_attacks", "failed_attacks", "business_value", "nr_employees",
           "employee_training", "known_vulnerabilities", "external_advisor"]

prediction_result_mapping = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}


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

    @api(input=JsonInput())
    def predict(self, body):
        """
        An inference API named `predict` with Dataframe input adapter, which codifies
        how HTTP requests or CSV files are converted to a pandas Dataframe object as the
        inference API function input
        """

        df = pd.DataFrame(body, index=[0], columns=columns)
        normalized_df = self.artifacts.scaler.transform(df)
        return {
            "KNN_prediction": prediction_result_mapping[self.artifacts.knn_model.predict(normalized_df)[0]],
            "MLP_prediction": prediction_result_mapping[self.artifacts.mlp_model.predict(normalized_df)[0]],
            "SVM_prediction": prediction_result_mapping[self.artifacts.svm_model.predict(normalized_df)[0]],
            "DTree_prediction": prediction_result_mapping[self.artifacts.tree_model.predict(df)[0]],
            # TODO design and implement model for predicting DDoS risk
            "ddos_prediction": prediction_result_mapping[self.artifacts.mlp_model.predict(normalized_df)[0]],
        }
