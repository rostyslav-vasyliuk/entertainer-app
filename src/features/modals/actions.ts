import { SET_LOGOUT_MODAL_VISIBILITY, SET_FEEDBACK_MODAL_VISIBILITY } from "./actionKeys";

export const setIsLogoutModalVisible = (isLogoutModalVisible) => ({
  type: SET_LOGOUT_MODAL_VISIBILITY,
  payload: {
    isLogoutModalVisible
  }
})

export const setIsFeedbackModalVisible = (isFeedbackModalVisible) => ({
  type: SET_FEEDBACK_MODAL_VISIBILITY,
  payload: {
    isFeedbackModalVisible
  }
})
