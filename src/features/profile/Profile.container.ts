import { connect } from 'react-redux';
import Profile from './Profile';
import { setIsLogoutModalVisible } from '../modals/actions';

const mapStateToProps: (state) => any = (state) => ({
  isLogoutModalVisible: state.modals.isLogoutModalVisible,
  userData: state.profile.userData
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogoutModalVisible: (isVisible: boolean) => {
    dispatch(setIsLogoutModalVisible(isVisible))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(Profile) as any;
