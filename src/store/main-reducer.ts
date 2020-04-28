import { combineReducers } from "redux";
import authReducer from '../features/auth/reducer';
import modalsReducer from '../features/modals/reducer';

export default combineReducers({
  auth: authReducer,
  modals: modalsReducer
});
