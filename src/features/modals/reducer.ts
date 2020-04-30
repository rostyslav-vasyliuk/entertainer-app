import * as actionKeys from './actionKeys';

type AuthReducer = {
  isLogoutModalVisible: boolean;
  isFeedbackModalVisible: boolean;
}

export const initialState: AuthReducer = {
  isLogoutModalVisible: false,
  isFeedbackModalVisible: true
};

// tslint:disable-next-line:no-any
export default function (state: AuthReducer = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_LOGOUT_MODAL_VISIBILITY: {
      return {
        ...state,
        isLogoutModalVisible: action.payload.isLogoutModalVisible
      };
    }

    case actionKeys.SET_FEEDBACK_MODAL_VISIBILITY: {
      return {
        ...state,
        isFeedbackModalVisible: action.payload.isFeedbackModalVisible
      };
    }

    default:
      return state;
  }
}
