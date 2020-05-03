import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { Button } from 'native-base';
import { BACKGROUND_LIGHT, BUTTON_COLOR, TEXT_COLOR, BACKGROUND } from '../../constants/color-constants';

const LogoutModal = (props) => {
  const onLogoutConfirm = async () => {
    await AsyncStorage.removeItem('access-token');
    props.setIsLogoutModalVisible(false);
    props.navigation.navigate('GreetingsScreen');
  }

  const onCancel = () => {
    props.setIsLogoutModalVisible(false);
  }

  return (
    <Modal
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}
      isVisible={props.isLogoutModalVisible}
      backdropOpacity={0.7}
    >
      <View style={styles.wrapper}>
        <View style={styles.lottieWrapper}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/logout-dark.json')}
            autoPlay
            loop={true}
          />
        </View>
        <Text style={styles.logoutLabel}>
          {'Are you sure you wish to logout?'}
        </Text>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
          <Button style={styles.cancelButton} danger bordered full onPressIn={() => onCancel()}>
            <Text style={{ color: TEXT_COLOR }}>
              {'Cancel'}
            </Text>
          </Button>
          <Button style={styles.confirmButton} dark full onPress={() => onLogoutConfirm()}>
            <Text style={{ color: TEXT_COLOR }}>
              {'Logout'}
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default LogoutModal;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BACKGROUND_LIGHT,
    padding: 10,
    paddingBottom: 15,
    borderRadius: 5,
    shadowColor: BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
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
    color: TEXT_COLOR
  },
  logoutDesc: {
    fontSize: 12,
    paddingTop: 10,
    color: 'gray'
  },
  cancelButton: {
    width: '40%',
    borderRadius: 8
  },
  confirmButton: {
    backgroundColor: BUTTON_COLOR,
    width: '40%',
    borderRadius: 8 
  }
})
