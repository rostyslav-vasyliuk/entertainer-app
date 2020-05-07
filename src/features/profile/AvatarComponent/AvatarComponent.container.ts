import { connect } from 'react-redux';
import AvatarComponent from './AvatarComponent';
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
export default connect(mapStateToProps, mapDispatchToProps)(AvatarComponent) as any;
