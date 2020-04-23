import { connect } from 'react-redux';
import FirstLastNameScreen from './FirstLastNameScreen';
import { setFirstLastName } from '../actions';

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
  setFirstLastName: (firstname: string, lastname: string) => {
    dispatch(setFirstLastName(firstname, lastname))
  }
  // editableItemChange: (value: string, field: string | number, isCreateMode: boolean) =>
  //   dispatch(editableItemChange(value, field, isCreateMode)),
  // editableItemChangeFull: (editableItem: Item) =>
  //   dispatch(editableItemChangeFull(editableItem)),
  // enableActionForm: () =>
  //   dispatch(enableActionForm())
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(FirstLastNameScreen) as any;
