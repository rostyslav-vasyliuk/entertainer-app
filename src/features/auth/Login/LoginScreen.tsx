import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { screenHeight, screenWidth } from '../../../constants/screen-contants';
import { Button, Text, Header, Left, Body, Title, Right } from 'native-base';
import { AntDesign } from 'react-native-vector-icons';
import { TextField } from 'react-native-material-textfield';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goBack = () => {
    props.navigation.push('GreetingsScreen');
  }

  const onLogin = () => {
    const body = {
      email,
      password
    };

    Axios.post('/auth/sign-in', body).then((response: AxiosResponse) => {
      console.log(response);
    })
  }

  const toSignUpPage = () => {
    props.navigation.push('SignUp');
  }

  const onForgotPassword = () => {
    props.navigation.push('ForgotPassword');
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
      <Header transparent>
        <Left>
          <Button transparent onPress={goBack}>
            <AntDesign name='arrowleft' size={30} />
          </Button>
        </Left>
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
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
              onChangeText={(password) => setPassword(password)}
              tintColor={'#fe4b66'}
              style={{ width: 200 }}
            />
          </View>
          <Button onPress={onForgotPassword}>
            <Text>
              Forgot password?
              </Text>
          </Button>
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <Button full style={styles.button} onPress={onLogin}>
          <Text>
            Login
          </Text>
        </Button>
        <View style={styles.additionalLink}>
          <Text style={styles.basicText}>
            Dont have an account?
              </Text>
          <TouchableOpacity onPress={toSignUpPage}>
            <Text style={styles.linkText}>
              Sing Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: screenHeight
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
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
    color: '#b0b1b2'
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
    paddingTop: '50%',
    marginLeft: '5%'
  }
})
