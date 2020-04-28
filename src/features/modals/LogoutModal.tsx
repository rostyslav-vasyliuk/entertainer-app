import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { Button } from 'native-base';

const LogoutModal = (props) => {
  const onLogoutConfirm = () => {

  }

  const onCancel = () => {
    props.setIsLogoutModalVisible(false);
  }

  return (
    <Modal
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}
      isVisible={props.isLogoutModalVisible}
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
            source={require('../../assets/logout.json')}
            autoPlay
            loop={true}
          />
        </View>
        <Text style={styles.logoutLabel}>
          {/* {'Confirm logout'} */}
          {'Are you sure you wish to logout?'}
        </Text>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
          <Button style={styles.cancelButton} dark bordered full onPressIn={() => onCancel()}>
            <Text>
              {'Cancel'}
            </Text>
          </Button>
          <Button style={styles.cancelButton} dark full onPress={() => onLogoutConfirm()}>
            <Text style={{ color: 'white' }}>
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
    backgroundColor: '#fafafa',
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
    paddingBottom: 20
  },
  logoutDesc: {
    fontSize: 12,
    paddingTop: 10,
    color: 'gray'
  },
  cancelButton: {
    // backgroundColor: 
    width: '40%',
    borderRadius: 8
  }
})
