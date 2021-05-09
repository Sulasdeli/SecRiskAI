import {IsInt, IsNotEmpty} from 'class-validator';

export class RecommendationProfile {
    @IsNotEmpty()
    region: string[];

    @IsNotEmpty()
    @IsInt()
    budget: number;

    @IsNotEmpty()
    @IsInt()
    budgetWeight: number;

    @IsNotEmpty()
    serviceType: string[];

    @IsNotEmpty()
    attackType: string[];

    @IsNotEmpty()
    deploymentTime: string;

    @IsNotEmpty()
    @IsInt()
    deploymentTimeWeight: number;

    @IsNotEmpty()
    leasingPeriod: string;

    @IsNotEmpty()
    @IsInt()
    leasingPeriodWeight: number;
}