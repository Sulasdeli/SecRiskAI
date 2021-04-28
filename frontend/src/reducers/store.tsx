import {UserProfileState} from "./UserProfile/types";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./UserProfile/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {PredictionState} from "./Prediction/types";
import thunk from "redux-thunk";
import {predictionReducer} from "./Prediction/reducer";
import {recommendationReducer} from "./Recommendation/reducer";
import {RecommendationState} from "./Recommendation/types";

export type RootState = {
    profile: UserProfileState,
    predictions: PredictionState,
    recommendations: RecommendationState
};

const rootReducer = combineReducers({
    profile: profileReducer(),
    predictions: predictionReducer(),
    recommendations: recommendationReducer()
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
