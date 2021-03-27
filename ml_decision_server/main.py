from src.risk_classifier import RiskClassifier
from joblib import load

prediction_result_mapping = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}

if __name__ == "__main__":
    # Create a risk classifier service instance
    risk_classifier_service = RiskClassifier()

    # Pack the newly trained model artifact
    risk_classifier_service.pack('knn_model', load('src/models/KNN_classifier.joblib'),
                                 metadata={
                                     'accuracy': '96.59%',
                                     'n_neighbors': 28,
                                     'weights': 'distance'
                                 })
    risk_classifier_service.pack('mlp_model', load('src/models/MLP_classifier.joblib'),
                                 metadata={
                                     'accuracy': '99.57%',
                                     'activation': 'tanh',
                                     'hidden_layer_sizes': '(5, 2)',
                                     'learning_rate': 'constant',
                                     'solver': 'adam'
                                 })
    risk_classifier_service.pack('svm_model', load('src/models/SVM_classifier.joblib'),
                                 metadata={
                                     'accuracy': '99.30%',
                                     'gamma': 'scale',
                                     'kernel': 'rbf'
                                 })
    risk_classifier_service.pack('tree_model', load('src/models/Tree_classifier.joblib'),
                                 metadata={
                                     'accuracy': '93.15%',
                                     'criterion': 'gini',
                                     'max_depth': 9,
                                     'min_samples_leaf': 5,
                                     'min_samples_split': 5
                                 })
    risk_classifier_service.pack('scaler', load('src/scaler/MinMaxScaler.joblib'))

    # Save the prediction service to disk for model serving
    #saved_path = risk_classifier_service.save_to_dir("./build")
    saved_path = risk_classifier_service.save()