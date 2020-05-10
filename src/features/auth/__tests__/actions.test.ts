import * as actionKeys from '../actionKeys';
import { setEmail, setFirstLastName, setCountryBirthGender } from '../actions';

describe('auth actions tests', () => {
  it('should test email action case #1', () => {
    const email = null;

    const expectedResult = {
      type: actionKeys.SET_EMAIL_SIGN_UP,
      payload: {
        email
      }
    }
    const actionResult = setEmail(email);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test email action case #2', () => {
    const email = undefined;

    const expectedResult = {
      type: actionKeys.SET_EMAIL_SIGN_UP,
      payload: {
        email
      }
    }
    const actionResult = setEmail(email);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test email action case #3', () => {
    const email = 'not email string';

    const expectedResult = {
      type: actionKeys.SET_EMAIL_SIGN_UP,
      payload: {
        email
      }
    }
    const actionResult = setEmail(email);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test email action case #4', () => {
    const email = 'email@mail.com';

    const expectedResult = {
      type: actionKeys.SET_EMAIL_SIGN_UP,
      payload: {
        email
      }
    }
    const actionResult = setEmail(email);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test email action case #5', () => {
    const email = '   ';

    const expectedResult = {
      type: actionKeys.SET_EMAIL_SIGN_UP,
      payload: {
        email
      }
    }
    const actionResult = setEmail(email);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test firstname and lastname action case #1', () => {
    const payloadMock = {
      firstname: 'John',
      lastname: 'Wick'
    };

    const expectedResult = {
      type: actionKeys.SET_FIRST_LAST_NAME_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setFirstLastName(payloadMock.firstname, payloadMock.lastname);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test firstname and lastname action case #2', () => {
    const payloadMock = {
      firstname: 'John',
      lastname: ''
    };

    const expectedResult = {
      type: actionKeys.SET_FIRST_LAST_NAME_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setFirstLastName(payloadMock.firstname, payloadMock.lastname);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test firstname and lastname action case #3', () => {
    const payloadMock = {
      firstname: 'John',
      lastname: undefined
    };

    const expectedResult = {
      type: actionKeys.SET_FIRST_LAST_NAME_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setFirstLastName(payloadMock.firstname, undefined);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test firstname and lastname action case #4', () => {
    const payloadMock = {
      firstname: undefined,
      lastname: undefined
    };

    const expectedResult = {
      type: actionKeys.SET_FIRST_LAST_NAME_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setFirstLastName(undefined, undefined);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #1', () => {
    const payloadMock = {
      country: undefined,
      birth: undefined,
      gender: undefined,
      countryCode: undefined
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(undefined, undefined, undefined, undefined);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #2', () => {
    const payloadMock = {
      country: 'Ukraine',
      birth: '12/05/1999',
      gender: 'Male',
      countryCode: 'UA'
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(payloadMock.country, payloadMock.birth, payloadMock.gender, payloadMock.countryCode);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #3', () => {
    const payloadMock = {
      country: 'USA',
      birth: '12/05/1999',
      gender: 'Male',
      countryCode: 'UA'
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(payloadMock.country, payloadMock.birth, payloadMock.gender, payloadMock.countryCode);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #4', () => {
    const payloadMock = {
      country: 'Ukraine',
      birth: 'string',
      gender: 'Male',
      countryCode: 'UA'
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(payloadMock.country, payloadMock.birth, payloadMock.gender, payloadMock.countryCode);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #5', () => {
    const payloadMock = {
      country: 'Ukraine',
      birth: '12/05/1999',
      gender: 'Female',
      countryCode: '!!!!!!!'
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(payloadMock.country, payloadMock.birth, payloadMock.gender, payloadMock.countryCode);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #6', () => {
    const payloadMock = {
      country: 'Ukraine',
      birth: null,
      gender: 'Male',
      countryCode: 'UA'
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(payloadMock.country, payloadMock.birth, payloadMock.gender, payloadMock.countryCode);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test country action case #7', () => {
    const payloadMock = {
      country: 'Ukraine',
      birth: '12/05/1999',
      gender: '',
      countryCode: ''
    };

    const expectedResult = {
      type: actionKeys.SET_COUNTRY_BIRTH_GENDER_SIGN_UP,
      payload: {
        ...payloadMock
      }
    }
    const actionResult = setCountryBirthGender(payloadMock.country, payloadMock.birth, payloadMock.gender, payloadMock.countryCode);

    expect(actionResult).toStrictEqual(expectedResult);
  });
});
