import { connect } from 'react-redux';
import Discover from './Discover';
import { setUserData } from '../profile/actions';

const mapStateToProps: (state) => any = (state) => ({
  userData: state.profile.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => {
    dispatch(setUserData(data))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(Discover) as any;
