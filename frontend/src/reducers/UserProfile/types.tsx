export type UserProfile = {
    companyName: string,
    industry: string,
    region: string,
    budget: number,
    budgetWeight: number,
    investedAmount: number,
    successfulAttacks: number,
    failedAttacks: number,
    businessValue: number,
    nrEmployees: number,
    employeeTraining: string,
    knownVulnerabilities: number,
    externalAdvisor: string,
}

export type ServiceConfiguration = {
    serviceType: string[],
    attackType: string[],
    deploymentTime: string,
    deploymentTimeWeight: number,
    leasingPeriod: string,
    leasingPeriodWeight: number
}

export enum ActionTypes {
    UPDATING_PROFILE = "UPDATING_PROFILE",
    UPDATING_SERVICE_CONFIGURATION = "UPDATING_SERVICE_CONFIGURATION",
}

/**
 * Action Types
 */
export type UpdateProfile = {
    type: ActionTypes.UPDATING_PROFILE,
    profile: UserProfile,
};

export type UpdateServiceConfiguration = {
    type: ActionTypes.UPDATING_SERVICE_CONFIGURATION,
    serviceConfiguration: ServiceConfiguration
};

/**
 * State Type
 */
export type UserProfileState = {
    profile: UserProfile,
    serviceConfiguration: ServiceConfiguration
};