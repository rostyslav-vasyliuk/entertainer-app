import { connect } from 'react-redux';
import Feedback from './Feedback';
import { setIsFeedbackModalVisible } from '../../../modals/actions';

const mapDispatchToProps = (dispatch) => ({
  setIsFeedbackModalVisible: (isVisible: boolean) => {
    dispatch(setIsFeedbackModalVisible(isVisible))
  }
});

// tslint:disable-next-line
export default connect(null, mapDispatchToProps)(Feedback) as any;
