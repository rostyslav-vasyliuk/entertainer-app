import { connect } from 'react-redux';
import ChangeEmail from './ChangeEmail';
import { setUserData } from '../../../actions';

const mapStateToProps: (state) => any = (state) => ({
  userData: state.profile.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => {
    dispatch(setUserData(data))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail) as any;
