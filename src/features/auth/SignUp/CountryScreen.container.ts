import { connect } from 'react-redux';
import CountryScreen from './CountryScreen';
import { setEmail, setCountryBirthGender } from '../actions';

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
  setCountryBirthGender: (country: string, birth: string, gender: string) => {
    dispatch(setCountryBirthGender(country, birth, gender))
  }
  // editableItemChange: (value: string, field: string | number, isCreateMode: boolean) =>
  //   dispatch(editableItemChange(value, field, isCreateMode)),
  // editableItemChangeFull: (editableItem: Item) =>
  //   dispatch(editableItemChangeFull(editableItem)),
  // enableActionForm: () =>
  //   dispatch(enableActionForm())
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(CountryScreen) as any;
