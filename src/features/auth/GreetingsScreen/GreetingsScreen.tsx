import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button, Text } from 'native-base';
import { screenWidth } from '../../../constants/screen-contants';
import { BACKGROUND, BACKGROUND_LIGHT, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';

const GreetingsScreen = (props) => {
  const toLoginPage = () => {
    props.navigation.push('Login');
  }

  const toSignUpPage = () => {
    props.navigation.push('SignUp');
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.wrapper}>
        <View style={{ height: '50%', display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../../../assets/3532-car.json')}
            autoPlay
            loop={true}
          />
        </View>
        <View style={{ height: '50%', display: 'flex', justifyContent: 'center' }}>
          <Text style={styles.labelHeader}>
            Getting started!
          </Text>
          <Text style={styles.labelDescription}>
            Create an account to access thousand of cool people who are waiting for you right now!
          </Text>
          <View style={styles.buttonsWrapper}>
            <Button full style={styles.button} onPress={toSignUpPage}>
              <Text>
                Sign Up
              </Text>
            </Button>
            <Button full transparent bordered danger style={styles.loginButton} onPress={toLoginPage}>
              <Text>
                Log In
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
}

export default GreetingsScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BACKGROUND
  },
  button: {
    margin: 10,
    height: 50,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
  },
  loginButton: {
    margin: 10,
    marginTop: 0,
    marginRight: 30,
    marginLeft: 30,
    height: 50,
    borderRadius: 5,
    color: '#fe4b66'
    // backgroundColor: '#fe4b66'
  },
  additionalLink: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicText: {
    color: TEXT_COLOR
  },
  linkText: {
    color: '#fe4b66',
    paddingLeft: 10
  },
  labelHeader: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    color: TEXT_COLOR
  },
  labelDescription: {
    textAlign: 'center',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 10,
    color: TEXT_COLOR_SECONDARY
  },
  buttonsWrapper: {
    width: screenWidth,
    paddingTop: 40
  }
})
