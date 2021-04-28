import {HttpService, Injectable} from '@nestjs/common';
import {UserProfile} from "./model/UserProfile";
import {Levels} from "./enums/levels";
import {Advisor} from "./enums/advisor";

@Injectable()
export class AppService {

    constructor(private httpService: HttpService) {}

    predict(body: UserProfile): Promise<any> {
        console.log(`${process.env.ML_SERVER_URL}/predict`)
        return this.httpService.post(`${process.env.ML_SERVER_URL}/predict`, this.toPredictionRequest(body)).toPromise();
    }

    recommend(): Promise<any> {
        console.log(`${process.env.MENTOR_URL}/v1/recommend`)
        let dummyBody = {
            "region": ["EUROPE"],
            "serviceType": ["PROACTIVE"],
            "attackType": [],
            "deploymentTime": "MINUTES",
            "deploymentTimeWeight": 1,
            "leasingPeriod": "MINUTES",
            "leasingPeriodWeight": 1,
            "budget": 50000,
            "budgetWeight": 1
        }
        return this.httpService.post(`${process.env.MENTOR_URL}/v1/recommend`, dummyBody).toPromise();
    }


    toPredictionRequest = (body: UserProfile): string => {
        return `[[${body.investedAmount}, ${body.successfulAttacks}, ${body.failedAttacks}, ${body.businessValue}, ${body.nrEmployees}, ${Levels[body.employeeTraining]}, ${body.knownVulnerabilities}, ${Advisor[body.externalAdvisor]}]]`;
    }
}
