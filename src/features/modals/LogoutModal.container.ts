import { connect } from 'react-redux';
import CountryScreen from './LogoutModal';
import { setIsLogoutModalVisible } from './actions';

const mapStateToProps: (state) => any = (state) => ({
  isLogoutModalVisible: state.modals.isLogoutModalVisible,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogoutModalVisible: (isVisible: boolean) => {
    dispatch(setIsLogoutModalVisible(isVisible))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen) as any;
