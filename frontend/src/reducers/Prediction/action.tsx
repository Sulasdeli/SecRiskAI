import {ThunkDispatch} from "redux-thunk";
import {ActionTypes, ErrorFetchingPredictions, FetchedPredictions, FetchingPredictions} from "./types";
import {getDomain} from "../../helpers/Domain";
import {HTTP_OPTIONS, PROTOCOL_METHOD} from "../../helpers/FetchOptions";

interface UserProfile {
    investedAmount: number,
    successfulAttacks: number,
    failedAttacks: number,
    businessValue: number,
    nrEmployees: number,
    employeeTraining: string,
    knownVulnerabilities: number,
    externalAdvisor: string
}

export const fetchPredictions = (profile: UserProfile): any => {
    return async (
        dispatch: ThunkDispatch<{}, {}, FetchingPredictions | FetchedPredictions | ErrorFetchingPredictions>
    ) => {

        dispatch({
            type: ActionTypes.FETCHING_PREDICTIONS,
            loading: true
        });

        //dummy promise
        //await new Promise(resolve => setTimeout(resolve, 2000));
        fetch(`${getDomain()}/predict`, {...HTTP_OPTIONS(PROTOCOL_METHOD.POST), body: JSON.stringify(profile)})
            .then(res => {
                console.log(res)
                console.log(JSON.stringify(profile))
                return res.json();
            })
            .then((response: any) => {
                console.log(response)
                dispatch({
                    type: ActionTypes.FETCHED_PREDICTIONS,
                    predictions: response,
                    loading: false
                });
            })
            .catch((error: string) => {
                console.log(error)
                dispatch({
                    type: ActionTypes.ERROR_FETCHING_PREDICTIONS,
                    error,
                    loading: false
                });
            });
    };
};