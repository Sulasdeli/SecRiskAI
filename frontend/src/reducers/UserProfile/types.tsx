export type UserProfile = {
    companyName: string,
    industry: string,
    region: string,
    budget: number,
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
    profile: UserProfile,
    updating: boolean
};

/**
 * State Type
 */
export type UserProfileState = {
    data: UserProfile,
    updating: boolean
};