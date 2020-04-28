import { SET_LOGOUT_MODAL_VISIBILITY } from "./actionKeys";

export const setIsLogoutModalVisible = (isLogoutModalVisible) => ({
  type: SET_LOGOUT_MODAL_VISIBILITY,
  payload: {
    isLogoutModalVisible
  }
})
