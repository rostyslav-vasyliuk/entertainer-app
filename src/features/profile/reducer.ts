import * as actionKeys from './actionKeys';

type AuthReducer = {
  data: any;
}

export const initialState: AuthReducer = {
  data: null
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

    default:
      return state;
  }
}
