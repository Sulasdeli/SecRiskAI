export type Prediction = {
    KNN_prediction: string,
    MLP_prediction: string,
    SVM_prediction: string,
    DTree_prediction: string,
    ddos_prediction: string
}

export enum ActionTypes {
    FETCHING_PREDICTIONS = "FETCHING_PREDICTIONS",
    FETCHED_PREDICTIONS = "FETCHED_PREDICTIONS",
    ERROR_FETCHING_PREDICTIONS = "ERROR_FETCHING_PREDICTIONS"
}

/**
 * Action Types
 */
export type FetchingPredictions = {
    type: ActionTypes.FETCHING_PREDICTIONS,
    loading: boolean
};

export type FetchedPredictions = {
    type: ActionTypes.FETCHED_PREDICTIONS,
    predictions: Prediction,
    loading: boolean
};


export type ErrorFetchingPredictions = {
    type: ActionTypes.ERROR_FETCHING_PREDICTIONS;
    error: string;
    loading: boolean;
};

/**
 * State Type
 */
export type PredictionState = {
    predictions: Prediction,
    pred_error?: string,
    pred_loading: boolean
};