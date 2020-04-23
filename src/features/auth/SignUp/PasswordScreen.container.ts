import { connect } from 'react-redux';
import PasswordScreen from './PasswordScreen';
import { setPassword } from '../actions';

// type StateProps = {
//   email: string;
//   firstname: string;
//   lastname: string;
//   gender: string;
//   country: string;
//   birthdate: string;
//   password: string;
// };

// const mapStateToProps: (state) => StateProps = (state) => ({
//   email: string;
//   firstname: string;
//   lastname: string;
//   gender: string;
//   country: string;
//   birthdate: string;
//   password: string;
//   // fields: state.config.fields,
//   // summary: state.config.summary
// });

const mapDispatchToProps = (dispatch) => ({
  setPassword: (password: string) => {
    dispatch(setPassword(password))
  }
  // editableItemChange: (value: string, field: string | number, isCreateMode: boolean) =>
  //   dispatch(editableItemChange(value, field, isCreateMode)),
  // editableItemChangeFull: (editableItem: Item) =>
  //   dispatch(editableItemChangeFull(editableItem)),
  // enableActionForm: () =>
  //   dispatch(enableActionForm())
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(PasswordScreen) as any;
