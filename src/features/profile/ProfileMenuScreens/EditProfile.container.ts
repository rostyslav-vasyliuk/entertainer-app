import { connect } from 'react-redux';
import EditProfile from './EditProfile';

const mapStateToProps: (state) => any = (state) => ({
  isLogoutModalVisible: state.modals.isLogoutModalVisible,
});

const mapDispatchToProps = (dispatch) => ({
  // setIsLogoutModalVisible: (isVisible: boolean) => {
  //   dispatch(setIsLogoutModalVisible(isVisible))
  // }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile) as any;
