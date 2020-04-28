import * as actionKeys from './actionKeys';

type AuthReducer = {
  isLogoutModalVisible: any;
}

export const initialState: AuthReducer = {
  isLogoutModalVisible: null
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

    default:
      return state;
  }
}
