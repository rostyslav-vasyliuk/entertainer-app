import { SET_LOGOUT_MODAL_VISIBILITY, SET_FEEDBACK_MODAL_VISIBILITY } from "../actionKeys";
import { setIsLogoutModalVisible, setIsFeedbackModalVisible } from "../actions";

describe('modals actions test suit', () => {
  it('should test logout modal action case #1', () => {
    const isLogoutModalVisible = true;

    const expectedResult = {
      type: SET_LOGOUT_MODAL_VISIBILITY,
      payload: {
        isLogoutModalVisible
      }
    }
    const actionResult = setIsLogoutModalVisible(isLogoutModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test logout modal action case #1', () => {
    const isLogoutModalVisible = 'some string';

    const expectedResult = {
      type: SET_LOGOUT_MODAL_VISIBILITY,
      payload: {
        isLogoutModalVisible
      }
    }
    const actionResult = setIsLogoutModalVisible(isLogoutModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test logout modal action case #3', () => {
    const isLogoutModalVisible = false;

    const expectedResult = {
      type: SET_LOGOUT_MODAL_VISIBILITY,
      payload: {
        isLogoutModalVisible
      }
    }
    const actionResult = setIsLogoutModalVisible(isLogoutModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test logout modal action case #4', () => {
    const isLogoutModalVisible = undefined;

    const expectedResult = {
      type: SET_LOGOUT_MODAL_VISIBILITY,
      payload: {
        isLogoutModalVisible
      }
    }
    const actionResult = setIsLogoutModalVisible(isLogoutModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test feedback modal action case #1', () => {
    const isFeedbackModalVisible = undefined;

    const expectedResult = {
      type: SET_FEEDBACK_MODAL_VISIBILITY,
      payload: {
        isFeedbackModalVisible
      }
    }
    const actionResult = setIsFeedbackModalVisible(isFeedbackModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test feedback modal action case #2', () => {
    const isFeedbackModalVisible = true;

    const expectedResult = {
      type: SET_FEEDBACK_MODAL_VISIBILITY,
      payload: {
        isFeedbackModalVisible
      }
    }
    const actionResult = setIsFeedbackModalVisible(isFeedbackModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test feedback modal action case #3', () => {
    const isFeedbackModalVisible = false;

    const expectedResult = {
      type: SET_FEEDBACK_MODAL_VISIBILITY,
      payload: {
        isFeedbackModalVisible
      }
    }
    const actionResult = setIsFeedbackModalVisible(isFeedbackModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });

  it('should test feedback modal action case #4', () => {
    const isFeedbackModalVisible = null;

    const expectedResult = {
      type: SET_FEEDBACK_MODAL_VISIBILITY,
      payload: {
        isFeedbackModalVisible
      }
    }
    const actionResult = setIsFeedbackModalVisible(isFeedbackModalVisible);

    expect(actionResult).toStrictEqual(expectedResult);
  });
})
