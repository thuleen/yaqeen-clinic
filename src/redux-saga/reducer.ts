import { combineReducers } from "redux";
import reducerDengue from "../dengue-testkit/redux-saga/reducer";

const reducer = combineReducers({
  dengue: reducerDengue,
});

export default reducer;