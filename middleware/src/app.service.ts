import {HttpService, Injectable} from '@nestjs/common';
import {UserProfile} from "./model/UserProfile";
import {Levels} from "./enums/levels";
import {Advisor} from "./enums/advisor";
import {RecommendationProfile} from "./model/RecommendationProfile";
import {Industry} from "./enums/industry";
import {Regions} from "./enums/regions";

@Injectable()
export class AppService {

    constructor(private httpService: HttpService) {}

    predict(body: UserProfile): Promise<any> {
        console.log(`${process.env.ML_SERVER_URL}/predict`)
        return this.httpService.post(`${process.env.ML_SERVER_URL}/predict`, {
            "cyberattackPredictionProfile": this.toCyberattackPredictionRequest(body),
            "ddosPredictionProfile": this.toDDoSPredictionRequest(body)
        }).toPromise();
    }

    recommend(body: RecommendationProfile): Promise<any> {
        console.log(`${process.env.MENTOR_URL}/v1/recommend`)
        return this.httpService.post(`${process.env.MENTOR_URL}/v1/recommend`, body).toPromise();
    }

    toCyberattackPredictionRequest = (body: UserProfile): string => {
        return `[[${body.investedAmount}, ${body.successfulAttacks}, ${body.failedAttacks}, ${body.businessValue}, ${body.nrEmployees}, ${Levels[body.employeeTraining]}, ${body.knownVulnerabilities}, ${Advisor[body.externalAdvisor]}]]`;
    }

    toDDoSPredictionRequest = (body: UserProfile): string => {
        return `[[${Industry[body.industry]}, ${Regions[body.region]}, ${body.investedAmount}, ${body.successfulAttacks}, ${body.failedAttacks}, ${body.businessValue}, ${body.knownVulnerabilities}, ${Advisor[body.externalAdvisor]}]]`;
    }
}
