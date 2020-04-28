import { connect } from 'react-redux';
import CountryScreen from './CountryScreen';
import { setEmail, setCountryBirthGender } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setCountryBirthGender: (country: string, birth: string, gender: string) => {
    dispatch(setCountryBirthGender(country, birth, gender))
  }
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(CountryScreen) as any;
