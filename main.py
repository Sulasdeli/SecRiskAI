from src.risk_classifier import RiskClassifier
from joblib import load

prediction_result_mapping = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}

if __name__ == "__main__":
    # Create a risk classifier service instance
    risk_classifier_service = RiskClassifier()

    # Pack the newly trained model artifact
    risk_classifier_service.pack('knn_model', load('src/models/KNN_classifier.joblib'))
    risk_classifier_service.pack('mlp_model', load('src/models/MLP_classifier.joblib'))
    risk_classifier_service.pack('svm_model', load('src/models/SVM_classifier.joblib'))
    risk_classifier_service.pack('tree_model', load('src/models/Tree_classifier.joblib'))
    risk_classifier_service.pack('scaler', load('src/scaler/MinMaxScaler.joblib'))

    # Save the prediction service to disk for model serving
    #saved_path = risk_classifier_service.save_to_dir("./build")
    saved_path = risk_classifier_service.save()