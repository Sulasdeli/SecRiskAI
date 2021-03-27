import {IsNotEmpty} from 'class-validator';
import {Levels} from "../enums/levels";
import {Advisor} from "../enums/advisor";

export class UserProfile {
    @IsNotEmpty()
    investedAmount: number;
    @IsNotEmpty()
    successfulAttacks: number;
    @IsNotEmpty()
    failedAttacks: number;
    @IsNotEmpty()
    businessValue: number;
    @IsNotEmpty()
    nrEmployees: number;
    @IsNotEmpty()
    employeeTraining: Levels;
    @IsNotEmpty()
    knownVulnerabilities: number;
    @IsNotEmpty()
    externalAdvisor: Advisor;
}