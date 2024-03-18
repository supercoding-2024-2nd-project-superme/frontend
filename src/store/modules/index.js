import { combineReducers } from "redux";
import selectedQuantity from "./selectedQuantity";

//각각의 reducer를 합치는 rootReducer
const rootReducer = combineReducers({ selectedQuantity });

export default rootReducer;
