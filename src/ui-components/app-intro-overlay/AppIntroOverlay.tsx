import React from 'react';
import { View, StyleSheet, StatusBar, Text, AsyncStorage } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/screen-contants';
import Swiper from 'react-native-swiper';
import LottieView from "lottie-react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';
import { TEXT_COLOR, BUTTON_COLOR, BACKGROUND, LOADER_COLOR } from '../../constants/color-constants';

type Props = {
  navigation: any;
}

const AppIntroOverlay = (props: Props) => {
  const _onContinue = async () => {
    await AsyncStorage.setItem('hasUserSeenIntro', 'true');
    props.navigation.navigate('GreetingsScreen');
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle='light-content' />
      <Swiper
        showsButtons={true}
        nextButton={<NextButton />}
        loop={false}
        prevButton={<View />}
        buttonWrapperStyle={styles.buttonWrapperStyle}
        dot={<Dot />}
        activeDot={<ActiveDot />}
      >
        <View style={styles.slideContainer}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/welcome-animation.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Welcome!</Text>
          <Text style={styles.slideDescription}>
            We are so excited you are joining our community! There are only few steps to start using our app.
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/develop.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Develop yourself!</Text>
          <Text style={styles.slideDescription}>
            With us you can find many interesting and totally free courses based on your preferences!
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/town.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Explore your town!</Text>
          <Text style={styles.slideDescription}>
            We will help you to not miss the most exciting entertaiments in your town!
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/analysis.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Get best recomendations!</Text>
          <Text style={styles.slideDescription}>
            We will analyse your preferences so that you will recieve only the most belowed recomendations!
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 350,
              height: 230,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/mobile-app.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Discover now!</Text>
          <Text style={styles.slideDescription}>
            We are continue developing ourselves and we are so exciting you are part of our big start!
            </Text>
          <Button iconLeft style={{ padding: 15, marginTop: 55, borderRadius: 10, backgroundColor: BUTTON_COLOR }} onPress={_onContinue}>
            <Text style={{ color: '#fff', fontSize: 18 }}>
              LET'S START
              </Text>
            <Icon name='arrow-forward' />
          </Button>
        </View>

      </Swiper>
    </View>
  )
}

export default AppIntroOverlay;

const styles = StyleSheet.create({
  wrapper: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: BACKGROUND
  },
  buttonWrapperStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  slideContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: screenHeight / 8,
    height: '100%',
    width: '100%'
  },
  slideHeader: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 24,
    letterSpacing: 1,
    fontWeight: '600',
    textAlign: 'center',
    color: TEXT_COLOR
  },
  slideDescription: {
    padding: 35,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 15,
    textAlign: 'center',
    color: LOADER_COLOR
  },
});

const NextButton = () => {
  return (
    <TouchableOpacity style={buttonStyles.wrapper}>
      <View>
        <AntDesign name={'arrowright'} size={30} color={BUTTON_COLOR} />
      </View>
    </TouchableOpacity>
  );
}

const Dot = () => {
  return (
    <View
      style={{
        backgroundColor: 'gray',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 5,
        opacity: 0.5
      }} />
  );
}

const ActiveDot = () => {
  return (
    <View
      style={{
        backgroundColor: '#fe4b66',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 5
      }}
    />
  )
}

const buttonStyles = StyleSheet.create({
  wrapper: {
    height: 40,
    width: 40,
    // backgroundColor: 'rgba(0,0,0,.09)',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
