import { SET_USER_DATA, CHANGE_COLOUR_THEME, SET_NETWORK_STATE, CHANGE_LANGUAGE } from "../actionKeys";
import { setUserData, changeColourTheme, changeNetworkState, changeLanguage } from "../actions";


describe('testing profile actions', () => {
  it('should test SET_USER_DATA action case #1', () => {
    const userData = { firstname: 'Name', lastname: 'Lastname' };

    const expectedResult = {
      type: SET_USER_DATA,
      payload: {
        data: userData
      }
    }
    const actionResult = setUserData(userData);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test SET_USER_DATA action case #2', () => {
    const userData = { firstname: 'Name', lastname: 'Lastname', country: 'Ukraine' };

    const expectedResult = {
      type: SET_USER_DATA,
      payload: {
        data: userData
      }
    }
    const actionResult = setUserData(userData);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test SET_USER_DATA action case #3', () => {
    const userData = { firstname: 'Name', lastname: 'Lastname', birthdate: null };

    const expectedResult = {
      type: SET_USER_DATA,
      payload: {
        data: userData
      }
    }
    const actionResult = setUserData(userData);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test SET_USER_DATA action case #4', () => {
    const userData = {};

    const expectedResult = {
      type: SET_USER_DATA,
      payload: {
        data: userData
      }
    }
    const actionResult = setUserData(userData);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test theme action case #1', () => {
    const theme = { theme: null };

    const expectedResult = {
      type: CHANGE_COLOUR_THEME,
      payload: {
        theme
      }
    }
    const actionResult = changeColourTheme(theme);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test theme action case #2', () => {
    const theme = { theme: undefined };

    const expectedResult = {
      type: CHANGE_COLOUR_THEME,
      payload: {
        theme
      }
    }
    const actionResult = changeColourTheme(theme);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test theme action case #3', () => {
    const theme = { theme: 'Boo boo' };

    const expectedResult = {
      type: CHANGE_COLOUR_THEME,
      payload: {
        theme
      }
    }
    const actionResult = changeColourTheme(theme);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test network change action case #1', () => {
    const isConnected = true

    const expectedResult = {
      type: SET_NETWORK_STATE,
      payload: {
        isConnected
      }
    }
    const actionResult = changeNetworkState(isConnected);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test network change action case #1', () => {
    const isConnected = true

    const expectedResult = {
      type: SET_NETWORK_STATE,
      payload: {
        isConnected
      }
    }
    const actionResult = changeNetworkState(isConnected);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test network change action case #2', () => {
    const isConnected = false

    const expectedResult = {
      type: SET_NETWORK_STATE,
      payload: {
        isConnected
      }
    }
    const actionResult = changeNetworkState(isConnected);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test network change action case #3', () => {
    const isConnected = null

    const expectedResult = {
      type: SET_NETWORK_STATE,
      payload: {
        isConnected
      }
    }
    const actionResult = changeNetworkState(isConnected);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test network change action case #4', () => {
    const isConnected = undefined

    const expectedResult = {
      type: SET_NETWORK_STATE,
      payload: {
        isConnected
      }
    }
    const actionResult = changeNetworkState(isConnected);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test change language action case #1', () => {
    const language = null;

    const expectedResult = {
      type: CHANGE_LANGUAGE,
      payload: {
        language
      }
    }
    const actionResult = changeLanguage(language);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test change language action case #1', () => {
    const language = null;

    const expectedResult = {
      type: CHANGE_LANGUAGE,
      payload: {
        language
      }
    }
    const actionResult = changeLanguage(language);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test change language action case #2', () => {
    const language = 'ua';

    const expectedResult = {
      type: CHANGE_LANGUAGE,
      payload: {
        language
      }
    }
    const actionResult = changeLanguage(language);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test change language action case #3', () => {
    const language = 'en';

    const expectedResult = {
      type: CHANGE_LANGUAGE,
      payload: {
        language
      }
    }
    const actionResult = changeLanguage(language);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test change language action case #4', () => {
    const language = 'some wrong string';

    const expectedResult = {
      type: CHANGE_LANGUAGE,
      payload: {
        language
      }
    }
    const actionResult = changeLanguage(language);

    expect(actionResult).toStrictEqual(expectedResult);
  });
}) 
