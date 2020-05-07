import { connect } from 'react-redux';
import CountryScreen from './CountryScreen';
import { setCountryBirthGender } from '../actions';

const mapStateToProps: (state) => any = (state) => ({
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
});

const mapDispatchToProps = (dispatch) => ({
  setCountryBirthGender: (country: string, birth: string, gender: string, countryCode: string) => {
    dispatch(setCountryBirthGender(country, birth, gender, countryCode))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen) as any;
