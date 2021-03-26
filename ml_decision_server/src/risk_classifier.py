import pandas as pd

from bentoml import env, artifacts, api, BentoService
from bentoml.adapters import DataframeInput
from bentoml.frameworks.sklearn import SklearnModelArtifact
from src.data_processor import DataProcessor
from bentoml.adapters import JsonInput
from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json
from jsonschema import Draft7Validator


# Schema used to validate input JSON
schema = {
    "type" : "object",
    "properties" : {
        "invested_amount" : {"type" : "number"},
        "successful_attacks" : {"type" : "number"},
        "failed_attacks" : {"type" : "number"},
        "business_value" : {"type" : "number"},
        "nr_employees" : {"type" : "number"},
        "employee_training" : {"enum": ["LOW", "MEDIUM", "HIGH"]},
        "known_vulnerabilities" : {"type" : "number"},
        "external_advisor" : {"enum": ["YES", "NO"]},
    },
}

example_input = {
   "invested_amount":1077113,
   "successful_attacks":8,
   "failed_attacks":29,
   "business_value":4947796,
   "nr_employees":57879,
   "employee_training":"MEDIUM",
   "known_vulnerabilities":6,
   "external_advisor":"YES"
}

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

    @api(input=JsonInput(example_input))
    def predict(self, body):
        """
        An inference API named `predict` with Dataframe input adapter, which codifies
        how HTTP requests or CSV files are converted to a pandas Dataframe object as the
        inference API function input
        """
        # Validate incoming request body
        validate(instance=body, schema=schema)

        df = DataProcessor(body).pre_process()
        normalized_df = self.artifacts.scaler.transform(df)
        return [{
                "KNN_prediction": prediction_result_mapping[self.artifacts.knn_model.predict(normalized_df)[0]],
                "MLP_prediction": prediction_result_mapping[self.artifacts.mlp_model.predict(normalized_df)[0]],
                "SVM_prediction": prediction_result_mapping[self.artifacts.svm_model.predict(normalized_df)[0]],
                "DTree_prediction": prediction_result_mapping[self.artifacts.tree_model.predict(df)[0]]
            }]