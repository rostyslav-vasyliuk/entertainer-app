import { connect } from 'react-redux';
import PasswordScreen from './PasswordScreen';
import { setPassword } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setPassword: (password: string) => {
    dispatch(setPassword(password))
  }
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(PasswordScreen) as any;
