import { connect } from 'react-redux';
import ChangeTheme from './ChangeTheme';
import { changeColourTheme } from '../../actions';

const mapStateToProps: (state) => any = (state) => ({
  theme: state.profile.theme,
});

const mapDispatchToProps = (dispatch) => ({
  changeColourTheme: (theme: string) => {
    dispatch(changeColourTheme(theme))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTheme) as any;
