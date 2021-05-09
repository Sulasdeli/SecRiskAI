import {
    ActionTypes,
    UpdateProfile,
    UpdateServiceConfiguration,
    UserProfileState
} from "./types";

const initialState: UserProfileState = {
    profile: {
        "companyName": "Company XY",
        "industry": "HEALTHCARE",
        "region": "EUROPE",
        "budget": 50000,
        "budgetWeight": 1,
        "investedAmount": 1077113,
        "successfulAttacks": 8,
        "failedAttacks": 29,
        "businessValue": 4947796,
        "nrEmployees": 57879,
        "employeeTraining": "HIGH",
        "knownVulnerabilities": 6,
        "externalAdvisor": "YES",
    },
    serviceConfiguration: {
        "serviceType": ["PROACTIVE"],
        "attackType": ["APPLICATION"],
        "deploymentTime": "SECONDS",
        "deploymentTimeWeight": 1,
        "leasingPeriod": "MINUTES",
        "leasingPeriodWeight": 1,
    }
};

export const profileReducer = () => {
    return (
        state = initialState,
        action: UpdateProfile | UpdateServiceConfiguration
    ) => {
        switch (action.type) {
            case ActionTypes.UPDATING_PROFILE:
                return {profile: action.profile, serviceConfiguration: {...state.serviceConfiguration}};
            case ActionTypes.UPDATING_SERVICE_CONFIGURATION:
                return {profile: {...state.profile}, serviceConfiguration: action.serviceConfiguration};
            default:
                return state;
        }
    };
};