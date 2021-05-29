from src.risk_classifier import RiskClassifier
from joblib import load

if __name__ == "__main__":
    # Create a risk classifier service instance
    risk_classifier_service = RiskClassifier()

    # Pack the newly trained model artifact
    # Overall Cyberattack Prediction Artifacts
    risk_classifier_service.pack('knn_model', load('src/models/KNN_classifier.joblib'),
                                 metadata={
                                     'accuracy': '96.40%',
                                     'n_neighbors': 23,
                                     'weights': 'distance'
                                 })
    risk_classifier_service.pack('mlp_model', load('src/models/MLP_classifier.joblib'),
                                 metadata={
                                     'accuracy': '99.63%',
                                     'activation': 'tanh',
                                     'hidden_layer_sizes': '(5, 5)',
                                     'learning_rate': 'invscaling',
                                     'solver': 'adam'
                                 })
    risk_classifier_service.pack('svm_model', load('src/models/SVM_classifier.joblib'),
                                 metadata={
                                     'accuracy': '99.25%',
                                     'gamma': 'scale',
                                     'kernel': 'rbf'
                                 })
    risk_classifier_service.pack('tree_model', load('src/models/Tree_classifier.joblib'),
                                 metadata={
                                     'accuracy': '92.17%',
                                     'criterion': 'gini',
                                     'max_depth': 9,
                                     'min_samples_leaf': 5,
                                     'min_samples_split': 2
                                 })
    risk_classifier_service.pack('scaler', load('src/scaler/MinMaxScaler.joblib'),
                                 metadata={
                                     'type': 'Min Max Scaler'
                                 })

    # DDoS Prediction Artifacts
    risk_classifier_service.pack('ddos_mlp_model', load('src/models/MLP_ddos_classifier.joblib'),
                                 metadata={
                                     'accuracy': '89.21%',
                                     'activation': 'logistic',
                                     'hidden_layer_sizes': '(5, 2)',
                                     'learning_rate': 'constant',
                                     'solver': 'lbfgs'
                                 })
    risk_classifier_service.pack('ddos_scaler', load('src/scaler/MinMaxScaler_ddos.joblib'),
                                 metadata={
                                     'type': 'Min Max Scaler for DDoS Prediction'
                                 })

    # Save the prediction service to disk for model serving
    # saved_path = risk_classifier_service.save_to_dir("./build")
    saved_path = risk_classifier_service.save()
