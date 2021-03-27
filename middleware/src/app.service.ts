import {HttpService, Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    constructor(private httpService: HttpService) {
    }


    getHello(): Promise<any> {

        let testBody = {
            "invested_amount": 1077113,
            "successful_attacks": 8,
            "failed_attacks": 29,
            "business_value": 4947796,
            "nr_employees": 57879,
            "employee_training": "MEDIUM",
            "known_vulnerabilities": 6,
            "external_advisor": "YES"
        }
            return this.httpService.post('http://ml_decision_server:5000/predict', testBody).toPromise();
    }
}
