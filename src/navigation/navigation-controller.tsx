import React, { useEffect } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Axios } from '../api/instance';
import { BACKGROUND, LOADER_COLOR } from '../constants/color-constants';
import { connect } from 'react-redux';
import { setUserData } from '../features/profile/actions';
import { AxiosResponse } from 'axios';

const NavigationController = (props) => {

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // if user is logged, it will be logged in automatically
      const token = await AsyncStorage.getItem('access-token');
      let response: AxiosResponse = null;
      if (token) {
        response = await Axios.post('/auth/validate-user', {}, { headers: { 'access-token': token } });
      }
      console.log('response');
      if (token !== null && response && response.status === 200) {
        console.log('Token setted')
        Object.assign(Axios.defaults, { headers: { 'access-token': token } });
        props.setUserData(response.data);
        props.navigation.navigate('App');
      } else {
        // if user has seen Intro it means that he is logged out - if not so its brand new user
        const hasUserSeenIntro = await AsyncStorage.getItem('hasUserSeenIntro');

        if (hasUserSeenIntro) {
          props.navigation.navigate('GreetingsScreen');
        } else {
          if (Platform.OS !== 'ios') {
            props.navigation.navigate('GreetingsScreen');
            AsyncStorage.setItem('hasUserSeenIntro', 'true');
          } else {
            console.log('hhh');
            props.navigation.navigate('Intro');
          }
        }
      }
    } catch (e) {
      console.log(e);
      props.navigation.navigate('GreetingsScreen');
    }
  }

  return (
    <View style={{ backgroundColor: BACKGROUND, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={LOADER_COLOR} />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data: any) => {
    dispatch(setUserData(data))
  }
});

export default connect(null, mapDispatchToProps)(NavigationController);
