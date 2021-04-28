import {ThunkDispatch} from "redux-thunk";
import {ActionTypes, ErrorFetchingRecommendations, FetchedRecommendations, FetchingRecommendations} from "./types";
import {getDomain} from "../../helpers/Domain";
import {HTTP_OPTIONS, PROTOCOL_METHOD} from "../../helpers/FetchOptions";

export const fetchRecommendations = () => {
    return async (
        dispatch: ThunkDispatch<{}, {}, FetchingRecommendations | FetchedRecommendations | ErrorFetchingRecommendations>
    ) => {

        dispatch({
            type: ActionTypes.FETCHING_RECOMMENDATIONS,
            loading: true
        });

        //dummy promise
        await new Promise(resolve => setTimeout(resolve, 1500));
        fetch(`${getDomain()}/recommend`, {...HTTP_OPTIONS(PROTOCOL_METHOD.POST)})
            .then(res => {
                return res.json();
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