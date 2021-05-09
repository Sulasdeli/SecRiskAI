import {
    ActionTypes,
    ErrorFetchingRecommendations,
    FetchedRecommendations,
    FetchingRecommendations,
    RecommendationState
} from "./types";

const initialState: RecommendationState = {
    recommendations: [],
    rec_loading: false
};

export const recommendationReducer = () => {
    return (
        state = initialState,
        action: FetchingRecommendations | FetchedRecommendations | ErrorFetchingRecommendations
    ) => {
        switch (action.type) {
            case ActionTypes.FETCHING_RECOMMENDATIONS:
                return {...state, rec_loading: action.loading};
            case ActionTypes.FETCHED_RECOMMENDATIONS:
                return {
                    ...state,
                    recommendations: action.recommendations,
                    rec_loading: action.loading
                };
            case ActionTypes.ERROR_FETCHING_RECOMMENDATIONS:
                return {...state, rec_error: action.error, rec_loading: action.loading};
            default:
                return state;
        }
    };
};