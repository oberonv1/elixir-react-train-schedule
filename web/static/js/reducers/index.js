import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import visitors from "./visitors";
import ws from "./ws";
import schedule from "./schedule";


export default combineReducers({
  routing: routerReducer,
  visitors,
  ws,
  schedule
});