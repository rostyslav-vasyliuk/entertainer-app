import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { Button } from 'native-base';
import { BUTTON_COLOR, BACKGROUND_LIGHT, TEXT_COLOR } from '../../constants/color-constants';

const FeedbackSuccessModal = (props) => {
  const onConfirm = async () => {
    props.setIsFeedbackModalVisible(false);
    props.navigation.navigate('Profile');
  }

  return (
    <Modal
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}
      isVisible={props.isFeedbackModalVisible}
      backdropOpacity={0.3}
    >
      <View style={styles.wrapper}>
        <View style={styles.lottieWrapper}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/success.json')}
            autoPlay
            loop={false}
          />
        </View>
        <Text style={styles.logoutLabel}>
          {'Your feedback was succesfully sent!'}
        </Text>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
          <Button style={styles.cancelButton} dark full onPress={() => onConfirm()}>
            <Text style={{ color: 'white' }}>
              {'Close'}
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default FeedbackSuccessModal;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BACKGROUND_LIGHT,
    padding: 10,
    paddingBottom: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    height: 200
  },
  lottieWrapper: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 20,
    color: TEXT_COLOR,
    textAlign: 'center'
  },
  logoutDesc: {
    fontSize: 12,
    paddingTop: 10,
    color: 'gray'
  },
  cancelButton: {
    width: '70%',
    borderRadius: 8,
    backgroundColor: BUTTON_COLOR
  }
})
