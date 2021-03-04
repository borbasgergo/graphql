import { createStore } from "redux";
import { combinedReducers } from "./rootReducer";


export const store = createStore(combinedReducers)