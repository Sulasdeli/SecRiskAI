import {IsEnum, IsInt, IsNotEmpty} from 'class-validator';
import {Levels} from "../enums/levels";
import {Advisor} from "../enums/advisor";

export class UserProfile {
    @IsNotEmpty()
    @IsInt()
    investedAmount: number;

    @IsNotEmpty()
    @IsInt()
    successfulAttacks: number;

    @IsNotEmpty()
    @IsInt()
    failedAttacks: number;

    @IsNotEmpty()
    @IsInt()
    businessValue: number;

    @IsNotEmpty()
    @IsInt()
    nrEmployees: number;

    @IsNotEmpty()
    @IsEnum(Levels)
    employeeTraining: string;

    @IsNotEmpty()
    @IsInt()
    knownVulnerabilities: number;

    @IsNotEmpty()
    @IsEnum(Advisor)
    externalAdvisor: string;
}