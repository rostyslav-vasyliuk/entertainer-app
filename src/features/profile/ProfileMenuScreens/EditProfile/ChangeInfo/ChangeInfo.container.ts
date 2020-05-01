import { connect } from 'react-redux';
import ChangeInfo from './ChangeInfo';
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo) as any;
