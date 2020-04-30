import * as actionKeys from './actionKeys';

type AuthReducer = {
  userData: any;
  theme: string;
  isConnected: boolean;
  language: string;
}

export const initialState: AuthReducer = {
  userData: null,
  theme: 'dark',
  isConnected: true,
  language: 'english'
};

// tslint:disable-next-line:no-any
export default function (state: AuthReducer = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_USER_DATA: {
      return {
        ...state,
        userData: action.payload.data
      };
    }

    case actionKeys.CHANGE_COLOUR_THEME: {
      return {
        ...state,
        theme: action.payload.theme
      };
    }

    case actionKeys.SET_NETWORK_STATE: {
      return {
        ...state,
        isConnected: action.payload.isConnected
      }
    }

    case actionKeys.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language
      }
    }

    default:
      return state;
  }
}
