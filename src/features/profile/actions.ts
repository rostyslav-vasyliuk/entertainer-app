import { SET_USER_DATA } from "./actionKeys";

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: {
    data
  }
})
