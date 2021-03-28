export type UserProfile = {
    investedAmount: number,
    successfulAttacks: number,
    failedAttacks: number,
    businessValue: number,
    nrEmployees: number,
    employeeTraining: string,
    knownVulnerabilities: number,
    externalAdvisor: string
}

export enum ActionTypes {
    UPDATING_PROFILE = "UPDATING_PROFILE",
}

/**
 * Action Types
 */
export type UpdateProfile = {
    type: ActionTypes.UPDATING_PROFILE,
    data: UserProfile,
    updating: boolean
};

/**
 * State Type
 */
export type UserProfileState = {
    data: UserProfile,
    updating: boolean
};