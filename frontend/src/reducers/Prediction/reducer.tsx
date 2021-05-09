import {ActionTypes, ErrorFetchingPredictions, FetchedPredictions, FetchingPredictions, PredictionState} from "./types";

const initialState: PredictionState = {
    predictions: {
        overall_risk_prediction: {
            knn: "",
            mlp: "",
            svm: "",
            dtree: ""
        },
        ddos_risk_prediction: ""
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
                return {...state, pred_error: action.error, pred_loading: action.loading};
            default:
                return state;
        }
    };
};