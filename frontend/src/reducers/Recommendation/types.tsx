export type Recommendation = {
    id: number,
    image: string,
    serviceName: string,
    providerName: string,
    description: string,
    features: string[],
    deployment: string,
    leasingPeriod: string,
    currency: string,
    price: number
}

export enum ActionTypes {
    FETCHING_RECOMMENDATIONS = "FETCHING_RECOMMENDATIONS",
    FETCHED_RECOMMENDATIONS = "FETCHED_RECOMMENDATIONS",
    ERROR_FETCHING_RECOMMENDATIONS = "ERROR_FETCHING_RECOMMENDATIONS"
}

/**
 * Action Types
 */
export type FetchingRecommendations = {
    type: ActionTypes.FETCHING_RECOMMENDATIONS,
    loading: boolean
};

export type FetchedRecommendations = {
    type: ActionTypes.FETCHED_RECOMMENDATIONS,
    recommendations: Recommendation,
    loading: boolean
};


export type ErrorFetchingRecommendations = {
    type: ActionTypes.ERROR_FETCHING_RECOMMENDATIONS;
    error: string;
    loading: boolean;
};

/**
 * State Type
 */
export type RecommendationState = {
    recommendations: Recommendation[],
    rec_error?: string,
    rec_loading: boolean
};