import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button, Text } from 'native-base';
import { screenWidth } from '../../../constants/screen-contants';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';

const GreetingsScreen = (props) => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const goToApp = () => {
    props.navigation.navigate('App');
  }

  useEffect(() => {
    const { firstname, lastname, email, password, gender, birthdate, country, countryCode } = props;

    const body = {
      firstname,
      lastname,
      email,
      password,
      gender,
      birthdate,
      country,
      countryCode
    }

    Axios.post('/auth/sign-up', body).then((response: AxiosResponse) => {
      setIsUserRegistered(true);
      const token = response.headers['access-token'];
      props.setUserData(response.data);
      AsyncStorage.setItem('access-token', token);
      Object.assign(Axios.defaults, { headers: { 'access-token': token } });
    })
  }, [])

  if (!isUserRegistered) {
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
              source={require('../../../assets/lottie/gears.json')}
              autoPlay
              loop={true}
            />
          </View>
          <View style={{ height: '50%', display: 'flex', justifyContent: 'center' }}>
            <Text style={styles.labelHeader}>
              {`Loading...`}
            </Text>
            <Text style={styles.labelDescription}>
              {'Please wait until we configure your account and setup everything for you!'}
            </Text>
          </View>
        </View>
      </>
    )
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
            source={require('../../../assets/lottie/trophy.json')}
            autoPlay
            loop={false}
          />
        </View>
        <View style={{ height: '50%', display: 'flex', justifyContent: 'center' }}>
          <Text style={styles.labelHeader}>
            {`Congratulations, ${props.firstname}!`}
          </Text>
          <Text style={styles.labelDescription}>
            {'You\'ve succesfully created an account in Entertainer. Click button below to explore our world!'}
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
    backgroundColor: BACKGROUND
  },
  button: {
    margin: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
  },
  labelHeader: {
    textAlign: 'center',
    fontSize: 24,
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
