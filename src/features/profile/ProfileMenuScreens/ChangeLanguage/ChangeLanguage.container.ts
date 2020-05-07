import { connect } from 'react-redux';
import ChangeLanguage from './ChangeLanguage';
import { changeLanguage } from '../../actions';
const mapStateToProps: (state) => any = (state) => ({
  language: state.profile.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (language: string) => {
    dispatch(changeLanguage(language))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage) as any;
