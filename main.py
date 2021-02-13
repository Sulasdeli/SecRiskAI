from risk_classifier import RiskClassifier

if __name__ == "__main__":
    # Create a risk classifier service instance
    risk_classifier_service = RiskClassifier()

    # Pack the newly trained model artifact
    risk_classifier_service.pack('model', clf)

    # Save the prediction service to disk for model serving
    saved_path = risk_classifier_service.save()