import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/screen-contants';
import Swiper from 'react-native-swiper';
import LottieView from "lottie-react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';

type Props = {
  navigation: any;
}

const AppIntroOverlay = (props: Props) => {
  const _onContinue = () => {
    props.navigation.navigate('GreetingsScreen');
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
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
            source={require('../../assets/welcome-animation.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Welcome!</Text>
          <Text style={styles.slideDescription}>
            We are so excited you are joining our community! There are only few steps to start using our app
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/world.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Choose language!</Text>
          <Text style={styles.slideDescription}>
            Easily find people from all around the world and improve your language skills together
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/town.json')}
            autoPlay
            loop={false}
          />
          <Text style={styles.slideHeader}>Explore your town!</Text>
          <Text style={styles.slideDescription}>
            We will help you to not miss the most exciting entertaiments in your town
            </Text>
        </View>

        <View style={[styles.slideContainer]}>
          <LottieView
            style={{
              width: 400,
              height: 250,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/analysis.json')}
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
              height: 200,
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/mobile-app.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.slideHeader}>Discover now!</Text>
          <Text style={styles.slideDescription}>
            With our app you may forget about books. Prefer conversations with real people!
            </Text>
          <Button iconLeft style={{ padding: 15, marginTop: 35, borderRadius: 10, backgroundColor: '#fe4b66' }} onPress={_onContinue}>
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
    backgroundColor: '#fff'
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
    fontWeight: '600',
    textAlign: 'center'
  },
  slideDescription: {
    padding: 35,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 16,
    textAlign: 'center',
    color: '#595959'
  },
  constinueButton: {
    color: '#fff'
  }
});

const NextButton = () => {
  return (
    <TouchableOpacity style={buttonStyles.wrapper}>
      <View>
        <AntDesign name={'arrowright'} size={30} color={'#fe4b66'} />
      </View>
    </TouchableOpacity>
  );
}

const Dot = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 5
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
  icon: {
    color: 'white'
  }
});
