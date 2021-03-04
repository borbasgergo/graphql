import { combineReducers } from "redux";
import { authReducer, AuthState } from "./reducers/authReducer";

export interface State {
    auth: AuthState
}

export const combinedReducers = combineReducers<State>({
    auth: authReducer
})