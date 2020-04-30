import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import { setUserData } from '../../profile/actions';

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data: any) => {
    dispatch(setUserData(data))
  }
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(LoginScreen) as any;
