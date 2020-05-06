import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, AsyncStorage, ActivityIndicator, Keyboard, Image } from 'react-native';
import { screenWidth } from '../../../constants/screen-contants';
import { Button, Text } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import HeaderCustom from '../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY, LOADER_COLOR } from '../../../constants/color-constants';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = () => {
    setIsLoading(true);
    Keyboard.dismiss();
    const body = {
      email,
      password
    };

    Axios.post('/auth/sign-in', body).then((response: AxiosResponse) => {
      const token = response.headers['access-token'];
      AsyncStorage.setItem('access-token', token);
      Object.assign(Axios.defaults, { headers: { 'access-token': token } });
      props.setUserData(response.data);
      setIsLoading(false);
      props.navigation.navigate('App');
    }).catch(() => {
      setIsLoading(false);
    })
  }

  const toSignUpPage = () => {
    props.navigation.push('SignUp');
  }

  const onForgotPassword = () => {
    props.navigation.push('ForgotPassword');
  }

  const onBack = () => {
    props.navigation.goBack();
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

  return (
    <View style={{ backgroundColor: BACKGROUND, height: '100%' }}>
      <HeaderCustom label={'Login'} back={onBack} />
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        <View>
          <View style={{ height: '45%', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
            <Image
              source={require('../../../../assets/dark-logo.png')}
              style={{ width: 240, height: 200 }}
            />
          </View>
          <View>
            <View style={styles.loginFormWrapper}>
              <TextField
                label='Email'
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCompleteType={'email'}
                tintColor={'#fe4b66'}
                keyboardType='email-address'
                autoCapitalize='none'
                baseColor={TEXT_COLOR}
                textColor={TEXT_COLOR}
                autoCorrect={false}
                returnKeyType='next'
                style={{ width: 200 }}
              />
              <View style={{ paddingTop: 0 }}>
                <TextField
                  label='Password'
                  autoCompleteType={'password'}
                  secureTextEntry={true}
                  returnKeyType='done'
                  autoCapitalize='none'
                  value={password}
                  baseColor={TEXT_COLOR}
                  textColor={TEXT_COLOR}
                  onChangeText={(password) => setPassword(password)}
                  tintColor={'#fe4b66'}
                  style={{ width: 200 }}
                />
              </View>
              <View style={{ width: screenWidth, alignItems: 'flex-end' }}>
                <Button transparent onPress={onForgotPassword} style={styles.forgotPasswordButton}>
                  <Text style={styles.forgotPasswordButtonLabel}>
                    {'Forgot password?'}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.buttonsWrapper}>
            <Button full style={styles.button} onPress={onLogin}>
              {isLoading ? (
                <ActivityIndicator color={LOADER_COLOR} />
              ) : (
                  <Text>
                    {'Login'}
                  </Text>
                )}
            </Button>
            <View style={styles.additionalLink}>
              <Text style={styles.basicText}>
                {'Dont have an account?'}
              </Text>
              <TouchableOpacity onPress={toSignUpPage}>
                <Text style={styles.linkText}>
                  {'Sing Up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
  },
  additionalLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5
  },
  basicText: {
    color: TEXT_COLOR_SECONDARY
  },
  linkText: {
    color: '#fe4b66',
    paddingLeft: 10
  },
  buttonsWrapper: {
    width: screenWidth,
    paddingTop: 10
  },
  loginFormWrapper: {
    display: 'flex',
    width: '90%',
    // paddingTop: '50%',
    marginLeft: '5%'
  },
  forgotPasswordButton: {
    paddingRight: '5%',
  },
  forgotPasswordButtonLabel: {
    color: '#fe4b66',
    fontSize: 14
  }
})
