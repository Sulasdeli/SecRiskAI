import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {UserProfile} from "./model/UserProfile";
import {PredictionResult} from "./model/PredictionResult";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("/predict")
    async predict(@Body() body: UserProfile): Promise<PredictionResult> {
        let response = await this.appService.predict(body);
        return response.data
    }
}
