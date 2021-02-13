COLUMNS = ['Invested Amount', 'Successful Attacks', 'Failed Attacks', 'Business Value', 'Number of Employees', 'Employee Training', 'Known Vulnerabilities', 'External Advisor', 'Risk']
FEATURES = COLUMNS[:-1]
LEVELS = ["LOW", "MEDIUM", "HIGH"]
levels_mapping = { 'LOW': 0, 'MEDIUM': 1, 'HIGH': 2 }
advisor_mapping = { 'NO': 0, 'YES': 1 }
prediction_result_mapping = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}