import { combineReducers } from "redux";

function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  mainReducer: reducer
});