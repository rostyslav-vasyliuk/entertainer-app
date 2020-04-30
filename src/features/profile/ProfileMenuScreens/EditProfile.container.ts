import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import { setUserData } from '../actions';

const mapStateToProps: (state) => any = (state) => ({
  userData: state.profile.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => {
    dispatch(setUserData(data))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile) as any;
