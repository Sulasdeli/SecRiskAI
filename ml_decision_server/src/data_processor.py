import pandas as pd

levels_mapping = { 'LOW': 0, 'MEDIUM': 1, 'HIGH': 2 }
advisor_mapping = { 'NO': 0, 'YES': 1 }
columns = ["invested_amount", "successful_attacks", "failed_attacks", "business_value", "nr_employees",
           "employee_training", "known_vulnerabilities", "external_advisor"]

class DataProcessor:
    """Class used to process and convert input to a pandas.DataFrame for prediction"""

    def __init__(self, data):
        self.data = data

    def pre_process(self):
        self.data['employee_training'] = levels_mapping[self.data['employee_training']]
        self.data['external_advisor'] = advisor_mapping[self.data['external_advisor']]
        return pd.DataFrame(self.data, index=[0], columns=columns)