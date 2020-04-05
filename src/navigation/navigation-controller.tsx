import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AsyncStorage } from 'react-native';

const NavigationController = (props) => {

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // if user is logged, it will be logged in automatically
      const isUsserLogged = await AsyncStorage.getItem('isUserLogged');
      if (isUsserLogged) {
        props.navigation.navigate('App');
      } else {
        // if user has seen Intro it means that he is logged out - if not so its brand new user
        const hasUserSeenIntro = await AsyncStorage.getItem('hasUserSeenIntro');
        if (hasUserSeenIntro) {
          props.navigation.navigate('GreetingsScreen');
        } else {
          props.navigation.navigate('SignUp');

          // props.navigation.navigate('Intro');
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}

export default NavigationController;