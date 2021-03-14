import { combineReducers } from "redux";
import cellReducers from "./cellReducers";

export default combineReducers({
  cells: cellReducers
});
