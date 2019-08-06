import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import counter from "./counter";
import auth from "./auth";
import user from "./user";


export default combineReducers({
  auth,
  form,
  counter,
  user,
});
