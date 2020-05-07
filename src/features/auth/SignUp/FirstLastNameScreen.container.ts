import { connect } from 'react-redux';
import FirstLastNameScreen from './FirstLastNameScreen';
import { setFirstLastName } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setFirstLastName: (firstname: string, lastname: string) => {
    dispatch(setFirstLastName(firstname, lastname))
  }
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(FirstLastNameScreen) as any;
