import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {UserProfile} from "./model/UserProfile";
import {PredictionResult} from "./model/PredictionResult";
import {RecommendationProfile} from "./model/RecommendationProfile";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("/predict")
    async predict(@Body() profile: UserProfile): Promise<PredictionResult> {
        let prediction = await this.appService.predict(profile);
        return prediction.data
    }

    @Post("/recommend")
    async recommend(@Body() recommendationProfile: RecommendationProfile): Promise<any> {
        let recommendation = await this.appService.recommend(recommendationProfile);
        return recommendation.data.recommendedServices
    }
}
