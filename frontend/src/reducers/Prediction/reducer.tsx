import {ActionTypes, ErrorFetchingPredictions, FetchedPredictions, FetchingPredictions, PredictionState} from "./types";

const initialState: PredictionState = {
    predictions: {
        KNN_prediction: "",
        MLP_prediction: "",
        SVM_prediction: "",
        DTree_prediction: "",
        ddos_prediction: "",
    },
    pred_loading: false
};

export const predictionReducer = () => {
    return (
        state = initialState,
        action: FetchingPredictions | FetchedPredictions | ErrorFetchingPredictions
    ) => {
        switch (action.type) {
            case ActionTypes.FETCHING_PREDICTIONS:
                return {...state, pred_loading: action.loading};
            case ActionTypes.FETCHED_PREDICTIONS:
                return {
                    ...state,
                    predictions: action.predictions,
                    pred_loading: action.loading
                };
            case ActionTypes.ERROR_FETCHING_PREDICTIONS:
                return {...state, error: action.error, pred_loading: action.loading};
            default:
                return state;
        }
    };
};