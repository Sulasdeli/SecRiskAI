import {UserProfileState} from "./UserProfile/types";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./UserProfile/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {PredictionState} from "./Prediction/types";
import thunk from "redux-thunk";
import {predictionReducer} from "./Prediction/reducer";

export type RootState = {
    profile: UserProfileState,
    predictions: PredictionState
};

const rootReducer = combineReducers({
    profile: profileReducer(),
    predictions: predictionReducer()
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
