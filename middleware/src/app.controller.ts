import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {UserProfile} from "./model/UserProfile";
import {PredictionResult} from "./model/PredictionResult";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("/predict")
    async predict(@Body() profile: UserProfile): Promise<PredictionResult> {
        let prediction = await this.appService.predict(profile);
        return prediction.data
    }

    @Post("/recommend")
    async recommend(): Promise<PredictionResult> {
        let recommendation = await this.appService.recommend();
        return recommendation.data.recommendedServices
    }
}
