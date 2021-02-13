# -*- coding: utf-8 -*-
"""MA_Erion_Sula.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1FRuExuNcLUq0fDFGWNMjfQ4ZdUcGYqJI
"""

import os
import random
import pandas as pd
import numpy
from sklearn.model_selection import train_test_split
from sklearn.metrics import plot_confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
from sklearn.tree import export_text
from joblib import dump, load

"""# Data Generation"""

columns = ['Invested Amount', 'Successful Attacks', 'Failed Attacks', 'Business Value', 'Number of Employees', 'Employee Training', 'Known Vulnerabilities', 'External Advisor', 'Risk']
features = columns[:-1]
LEVELS = ["LOW", "MEDIUM", "HIGH"]
prediction_result_mapping = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}

def generate_data(nr_entries = 1000, min_empl = 30, max_empl = 90000, min_nr_attacks = 0, nr_attacks = 50, 
                  avg_business_value = 5000000, std_business_value = 50000, max_invested_perc = 0.3, max_nr_vulnerabilities = 10):
    df = pd.DataFrame(columns=columns)
    for i in range(0, nr_entries):
        nr_employees = random.randint(min_empl, max_empl)
        employees_training = random.choice(LEVELS)
        failed_attack = random.randrange(nr_attacks)
        succ_attack = random.randrange(nr_attacks)
        business_value = int(numpy.random.normal(loc=avg_business_value, scale=std_business_value))
        invested_perc = random.uniform(0, max_invested_perc)
        invested_amount = int(invested_perc * business_value)
        known_vulnerabilities = random.randrange(max_nr_vulnerabilities)
        external_adv = "NO" if (i % 2) == 0 else "YES"

        # Risk is computed based on the other parameters and is then categorized using 'get_categorized_risk'
        computed_risk = invested_perc - (succ_attack / nr_attacks) + (nr_employees / max_empl) * LEVELS.index(employees_training) - (known_vulnerabilities / max_nr_vulnerabilities) + (i % 2) / 3
        
        df.loc[i] = [invested_amount, succ_attack, failed_attack, business_value, nr_employees, employees_training, known_vulnerabilities, external_adv, get_categorized_risk(computed_risk)]
    return df

def get_categorized_risk(weighted_risk, low_medium_boundary = 1.0, medium_high_boundary = 0.0):
  if weighted_risk >= low_medium_boundary:
      return "LOW"
  elif weighted_risk >= medium_high_boundary and weighted_risk < low_medium_boundary:
      return "MEDIUM"
  else:
      return "HIGH"

data = generate_data(nr_entries = 10000)

data.head()

data.describe()

"""## Data Export as .csv"""

data.to_csv('data.csv')

"""# Data Processing

## Categorization Step
"""

levels_mapping = { 'LOW': 0, 'MEDIUM': 1, 'HIGH': 2 }
advisor_mapping = { 'NO': 0, 'YES': 1 }

data = data.replace({'Employee Training': levels_mapping, 'Risk': levels_mapping, 'External Advisor': advisor_mapping})

data.head()

"""## Normalization Step"""

normalized_data = data[features].apply(lambda x: ( (x - x.min()) / (x.max() - x.min())))
normalized_data.head()

"""# Deep Neural Network Classifier"""

import tensorflow as tf
print(tf.__version__)

# Define the training inputs
def get_train_inputs():
    x = { feature_name: tf.constant(X_train, dtype=tf.float64)}
    y = tf.constant(y_train, dtype=tf.int32)
    return x, y

# Define the test inputs
def get_test_inputs():
    x = { feature_name: tf.constant(X_test, dtype=tf.float64)}
    y = tf.constant(y_test, dtype=tf.int32)
    return x, y

X_train, X_test, y_train, y_test = train_test_split(normalized_data[features].values, data["Risk"].values, test_size=0.35)

# Specify that all features have real-value data
feature_name = "risk_features"
feature_columns = [tf.feature_column.numeric_column(feature_name, 
                                                    shape=len(features))]

# Build 5 layer DNN with 512, 256, 128, 64, 32 units respectively.
classifier = tf.estimator.DNNClassifier(feature_columns=feature_columns,
                                            hidden_units=[512, 256, 128, 64],
                                            n_classes=3)

"""## Train"""

classifier.train(input_fn=get_train_inputs, steps=5000)

"""## Evaluate"""

accuracy_score = classifier.evaluate(input_fn=get_test_inputs, steps=100)["accuracy"]

print('Accuracy: {0:.2%}'.format(accuracy_score))

"""## Export"""

feature_spec = {'risk_features': tf.io.FixedLenFeature(shape=len(features), dtype=tf.float32)}

serving_fn = tf.estimator.export.build_parsing_serving_input_receiver_fn(feature_spec)

classifier.export_saved_model(export_dir_base='./model/export', serving_input_receiver_fn=serving_fn)

"""## Prediction

### Data Preparation
"""

def get_data_for_prediction():
  return { feature_name: tf.constant(normalized_prediction_df, dtype=tf.float64)}

# Create DataFrame from data to be predicted
prediction_df = pd.DataFrame([[1077113, 8, 29, 4947796, 57879, 1, 6, 0]], columns=features)

# Normalize using the initial dataframe -> bring the data for the prediction to the same scale
normalized_prediction_df = prediction_df[features]
for feature in features:
    normalized_prediction_df[feature] = normalized_prediction_df[feature].apply(lambda x: ( (x - data[feature].min()) / (data[feature].max() - data[feature].min())))

normalized_prediction_df

"""### Result"""

for pred in classifier.predict(input_fn=get_data_for_prediction):
  print("\n")
  print("Predicted RISK is: " + prediction_result_mapping[pred['class_ids'][0]])
  break

"""# Decision Tree Classifier"""

from sklearn.tree import DecisionTreeClassifier 
from sklearn.metrics import accuracy_score

# Data here is not normalized
X_train, X_test, y_train, y_test = train_test_split(data[features].values, data["Risk"].values, random_state=0)

"""## Train"""

dtree_model = DecisionTreeClassifier().fit(X_train, y_train)

"""## Evaluate"""

accuracy = dtree_model.score(X_test, y_test) 

print('Accuracy: {0:.2%}'.format(accuracy))

plot_confusion_matrix(dtree_model, X_test, y_test)  
plt.show()

"""## Export"""

#r = export_text(dtree_model, feature_names=features)
#print(r)

dump(dtree_model, 'Tree_classifier.joblib')

"""## Prediction"""

# Create DataFrame from data to be predicted
prediction_df = pd.DataFrame([[1077113, 8, 29, 4947796, 57879, 1, 6, 0]], columns=features)
prediction_df

predicted_risk = dtree_model.predict(prediction_df)[0]
print("Predicted RISK is: " + prediction_result_mapping[predicted_risk])

"""# Support Vector Machine (SVM) classifier"""

from sklearn.svm import LinearSVC, SVC

# Data here is normalized
X_train, X_test, y_train, y_test = train_test_split(normalized_data[features].values, data["Risk"].values)

"""## Train"""

# Linear
#svm_model = LinearSVC().fit(X_train, y_train)

svm_model = SVC(kernel='poly').fit(X_train, y_train)

"""## Evaluate"""

accuracy = svm_model.score(X_test, y_test) 

print('Accuracy: {0:.2%}'.format(accuracy))

plot_confusion_matrix(svm_model, X_test, y_test)  
plt.show()

"""## Export"""

dump(svm_model, 'SVM_classifier.joblib')

"""## Prediction"""

predicted_risk = svm_model.predict(normalized_prediction_df)[0]
print("Predicted RISK is: " + prediction_result_mapping[predicted_risk])

"""# K-nearest Neighbours Classifier"""

from sklearn.neighbors import KNeighborsClassifier

# Data here is not normalized
X_train, X_test, y_train, y_test = train_test_split(normalized_data[features].values, data["Risk"].values)

"""## Train"""

knn = KNeighborsClassifier(n_neighbors = 17).fit(X_train, y_train)

"""## Evaluate"""

accuracy = knn.score(X_test, y_test) 
print('Accuracy: {0:.2%}'.format(accuracy))

plot_confusion_matrix(knn, X_test, y_test)  
plt.show()

"""## Export"""

dump(knn, 'KNN_classifier.joblib')

"""## Prediction"""

predicted_risk = knn.predict(normalized_prediction_df)[0]
print("Predicted RISK is: " + prediction_result_mapping[predicted_risk])

"""# Multilayer Perceptron (MLP) using Backpropagation"""

from sklearn.neural_network import MLPClassifier

# Data here is normalized
X_train, X_test, y_train, y_test = train_test_split(normalized_data[features].values, data["Risk"].values)

clf = MLPClassifier(activation='tanh', solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), max_iter=10000)

"""## Train"""

clf.fit(X_train, y_train)

"""## Evaluate"""

accuracy = clf.score(X_test, y_test) 

print('Accuracy: {0:.2%}'.format(accuracy))

# lbfgs
# identity -> 90.72%
# logistic -> 98.88%
# tanh -> 99.68%
# relu -> 62.08%


# sgd
# identity -> 90.48%
# logistic -> 62.08%
# tanh -> 98.24%
# relu -> 62.08%

# adam
# identity -> 90.88%
# logistic -> 98.48%
# tanh -> 99.04%
# relu -> 98.88%

plot_confusion_matrix(clf, X_test, y_test)  
plt.show()

"""## Export"""

dump(clf, 'MLP_back.joblib')

"""## Prediction"""

predicted_risk = knn.predict(normalized_prediction_df)[0]
print("Predicted RISK is: " + prediction_result_mapping[predicted_risk])