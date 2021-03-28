import {ActionTypes, UpdateProfile, UserProfileState} from "./types";

const initialState: UserProfileState = {
    data: {
        "companyName": "Company XY",
        "investedAmount": 1077113,
        "successfulAttacks": 8,
        "failedAttacks": 29,
        "businessValue": 4947796,
        "nrEmployees": 57879,
        "employeeTraining": "HIGH",
        "knownVulnerabilities": 6,
        "externalAdvisor": "YES"
    },
    updating: false
};

export const profileReducer = () => {
    return (
        state = initialState,
        action: UpdateProfile
    ) => {
        switch (action.type) {
            case ActionTypes.UPDATING_PROFILE:
                return {data: action.profile, updating: action.updating};
            default:
                return state;
        }
    };
};