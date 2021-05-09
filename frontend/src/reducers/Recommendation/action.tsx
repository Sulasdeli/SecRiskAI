import {ThunkDispatch} from "redux-thunk";
import {ActionTypes, ErrorFetchingRecommendations, FetchedRecommendations, FetchingRecommendations} from "./types";
import {getDomain} from "../../helpers/Domain";
import {HTTP_OPTIONS, PROTOCOL_METHOD} from "../../helpers/FetchOptions";

interface RecommendationProfile {
    region: string[],
    serviceType: string[],
    attackType: string[],
    deploymentTime: string,
    deploymentTimeWeight: number,
    leasingPeriod: string,
    leasingPeriodWeight: number,
    budget: number,
    budgetWeight: number
}

export const fetchRecommendations = (profile: RecommendationProfile) => {
    return async (
        dispatch: ThunkDispatch<{}, {}, FetchingRecommendations | FetchedRecommendations | ErrorFetchingRecommendations>
    ) => {

        dispatch({
            type: ActionTypes.FETCHING_RECOMMENDATIONS,
            loading: true
        });

        //dummy promise
        await new Promise(resolve => setTimeout(resolve, 1500));
        fetch(`${getDomain()}/recommend`, {...HTTP_OPTIONS(PROTOCOL_METHOD.POST), body: JSON.stringify(profile)})
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch server...');
                }
            })
            .then((response: any) => {
                dispatch({
                    type: ActionTypes.FETCHED_RECOMMENDATIONS,
                    recommendations: response,
                    loading: false
                });
            })
            .catch((error: string) => {
                dispatch({
                    type: ActionTypes.ERROR_FETCHING_RECOMMENDATIONS,
                    error,
                    loading: false
                });
            });
    };
};