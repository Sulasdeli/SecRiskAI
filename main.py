from risk_classifier import RiskClassifier
from joblib import load

if __name__ == "__main__":
    # Create a risk classifier service instance
    risk_classifier_service = RiskClassifier()

    # Pack the newly trained model artifact
    risk_classifier_service.pack('knn_model', load('models/KNN_classifier.joblib'))
    risk_classifier_service.pack('mlp_model', load('models/MLP_classifier.joblib'))
    risk_classifier_service.pack('svm_model', load('models/SVM_classifier.joblib'))
    risk_classifier_service.pack('tree_model', load('models/Tree_classifier.joblib'))

    # Save the prediction service to disk for model serving
    saved_path = risk_classifier_service.save()