import pandas as pd

from bentoml import env, artifacts, api, BentoService
from bentoml.frameworks.sklearn import SklearnModelArtifact
from bentoml.adapters import JsonInput

prediction_result_mapping = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}


@env(infer_pip_packages=True)
@artifacts([SklearnModelArtifact('knn_model'),
            SklearnModelArtifact('mlp_model'),
            SklearnModelArtifact('svm_model'),
            SklearnModelArtifact('tree_model'),
            SklearnModelArtifact('scaler'),
            SklearnModelArtifact('ddos_mlp_model'),
            SklearnModelArtifact('ddos_scaler')])
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

        cyberattack_df = pd.DataFrame(eval(body['cyberattackPredictionProfile']))
        normalized_cyberattack_df = self.artifacts.scaler.transform(cyberattack_df)

        normalized_ddos_df = self.artifacts.ddos_scaler.transform(
            pd.DataFrame(eval(body['ddosPredictionProfile'])))

        return {
            "overall_risk_prediction": {
                "knn": prediction_result_mapping[self.artifacts.knn_model.predict(normalized_cyberattack_df)[0]],
                "mlp": prediction_result_mapping[self.artifacts.mlp_model.predict(normalized_cyberattack_df)[0]],
                "svm": prediction_result_mapping[self.artifacts.svm_model.predict(normalized_cyberattack_df)[0]],
                "dtree": prediction_result_mapping[self.artifacts.tree_model.predict(cyberattack_df)[0]]
            },
            "ddos_risk_prediction": prediction_result_mapping[
                self.artifacts.ddos_mlp_model.predict(normalized_ddos_df)[0]]
        }
