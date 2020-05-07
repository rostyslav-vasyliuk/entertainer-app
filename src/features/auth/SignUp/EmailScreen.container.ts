import { connect } from 'react-redux';
import EmailScreen from './EmailScreen';
import { setEmail } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email: string) => {
    dispatch(setEmail(email))
  }
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(EmailScreen) as any;
