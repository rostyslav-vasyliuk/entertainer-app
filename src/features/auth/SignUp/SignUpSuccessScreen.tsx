import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button, Text } from 'native-base';
import { screenWidth } from '../../../constants/screen-contants';

const GreetingsScreen = (props) => {
  const goToApp = () => {
    props.navigation.navigate('App');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <View style={{ height: '50%', display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../../../assets/trophy.json')}
            autoPlay
            loop={false}
          />
        </View>
        <View style={{ height: '50%', display: 'flex', justifyContent: 'center' }}>
          <Text style={styles.labelHeader}>
            Congratulations, Name!
          </Text>
          <Text style={styles.labelDescription}>
            {'You\'ve succesfully created an account in Linguameet. Click button below to explore our world!'}
          </Text>
          <View style={styles.buttonsWrapper}>
            <Button full style={styles.button} onPress={goToApp}>
              <Text>
                Lets start!
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
  },
  button: {
    margin: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
  },
  additionalLink: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicText: {
    color: '#b0b1b2'
  },
  linkText: {
    color: '#fe4b66',
    paddingLeft: 10
  },
  labelHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500'
  },
  labelDescription: {
    textAlign: 'center',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 10,
    color: '#b0b1b2'
  },
  buttonsWrapper: {
    width: screenWidth,
    paddingTop: 40
  }
})