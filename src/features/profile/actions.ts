import { SET_USER_DATA, CHANGE_COLOUR_THEME, SET_NETWORK_STATE, CHANGE_LANGUAGE } from "./actionKeys";

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

export const changeNetworkState = (isConnected) => ({
  type: SET_NETWORK_STATE,
  payload: {
    isConnected
  }
})

export const changeLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  payload: {
    language
  }
})
