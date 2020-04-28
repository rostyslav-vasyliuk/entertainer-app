import { combineReducers } from "redux";
import authReducer from '../features/auth/reducer';
import modalsReducer from '../features/modals/reducer';
import profileReducer from '../features/profile/reducer';

export default combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  profile: profileReducer
});
