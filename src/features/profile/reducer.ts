import * as actionKeys from './actionKeys';

type AuthReducer = {
  data: any;
  theme: string;
}

export const initialState: AuthReducer = {
  data: null,
  theme: 'dark'
};

// tslint:disable-next-line:no-any
export default function (state: AuthReducer = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_USER_DATA: {
      return {
        ...state,
        data: action.payload.data
      };
    }

    case actionKeys.CHANGE_COLOUR_THEME: {
      return {
        ...state,
        theme: action.payload.theme
      };
    }

    default:
      return state;
  }
}
