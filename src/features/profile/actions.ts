import { SET_USER_DATA, CHANGE_COLOUR_THEME } from "./actionKeys";

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: {
    data
  }
})

export const changeColourTheme = (theme) => ({
  type: CHANGE_COLOUR_THEME,
  payload: {
    theme
  }
})
