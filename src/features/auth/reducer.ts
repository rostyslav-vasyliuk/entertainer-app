import * as actionKeys from './actionKeys';

type AuthReducer = {
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  country: string;
  countryCode: string;
  birthdate: string;
  password: string;
}

export const initialState: AuthReducer = {
  email: null,
  firstname: null,
  lastname: null,
  gender: null,
  country: null,
  birthdate: null,
  password: null,
  countryCode: null
};

// tslint:disable-next-line:no-any
export default function (state: AuthReducer = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_EMAIL_SIGN_UP: {
      return {
        ...state,
        email: action.payload.email
      };
    }

    case actionKeys.SET_FIRST_LAST_NAME_SIGN_UP: {
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname
      };
    }

    case actionKeys.SET_PASSWORD_SIGN_UP: {
      return {
        ...state,
        password: action.payload.password
      };
    }

    case actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP: {
      return {
        ...state,
        country: action.payload.country,
        countryCode: action.payload.countryCode,
        birthdate: action.payload.birth,
        gender: action.payload.gender
      };
    }


    default:
      return state;
  }
}
