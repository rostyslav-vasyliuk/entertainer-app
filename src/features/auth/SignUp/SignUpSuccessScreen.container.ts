import { connect } from 'react-redux';
import SignUpSuccessScreen from './SignUpSuccessScreen';
import { setEmail } from '../actions';

type StateProps = {
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  country: string;
  birthdate: string;
  password: string;
};

const mapStateToProps: (state) => StateProps = (state) => ({
  email: state.auth.email,
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
  gender: state.auth.gender,
  country: state.auth.country,
  birthdate: state.auth.birthdate,
  password: state.auth.password,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email: string) => {
    dispatch(setEmail(email))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpSuccessScreen) as any;
