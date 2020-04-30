import { connect } from 'react-redux';
import FeedbackSuccessModal from './FeedbackSuccessModal';
import { setIsFeedbackModalVisible } from './actions';

const mapStateToProps: (state) => any = (state) => ({
  isFeedbackModalVisible: state.modals.isFeedbackModalVisible,
});

const mapDispatchToProps = (dispatch) => ({
  setIsFeedbackModalVisible: (isVisible: boolean) => {
    dispatch(setIsFeedbackModalVisible(isVisible))
  }
});

// tslint:disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackSuccessModal) as any;
