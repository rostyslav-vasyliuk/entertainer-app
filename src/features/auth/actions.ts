import * as actionKeys from './actionKeys';

export const setEmail = (email: string) => ({
  type: actionKeys.SET_EMAIL_SIGN_UP,
  payload: {
    email
  }
});

export const setFirstLastName = (firstname: string, lastname: string) => ({
  type: actionKeys.SET_FIRST_LAST_NAME_SIGN_UP,
  payload: {
    firstname,
    lastname
  }
});

export const setCountryBirthGender = (country: string, birth: string, gender: string, countryCode: string) => ({
  type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
  payload: {
    country,
    birth,
    gender,
    countryCode
  }
});

export const setPassword = (password: string) => ({
  type: actionKeys.SET_PASSWORD_SIGN_UP,
  payload: {
    password
  }
});
