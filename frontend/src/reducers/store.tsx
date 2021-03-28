import {UserProfileState} from "./UserProfile/types";
import {combineReducers, createStore} from "redux";
import {profileReducer} from "./UserProfile/reducer";
import {composeWithDevTools} from "redux-devtools-extension";

export type RootState = {
    profile: UserProfileState
};

const rootReducer = combineReducers({
    profile: profileReducer()
});

export const store = createStore(
    rootReducer,
    composeWithDevTools()
);
