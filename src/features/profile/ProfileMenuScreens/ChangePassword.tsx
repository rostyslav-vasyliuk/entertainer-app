import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Header, Left, Body, Right, Text, Toast } from 'native-base';
import { AntDesign } from 'react-native-vector-icons';
import { TextField } from 'react-native-material-textfield';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { Axios } from '../../../api/instance';
import { screenWidth } from '../../../constants/screen-contants';

const ChangePassword = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    // props.setPassword(newPassword);
    const token = props.navigation.getParam('reset-password-token', null);
    const email = props.navigation.getParam('email', null);
    Axios.post('/auth/reset-password', { email, password: newPassword }, { headers: { 'reset-password-token': token } })
      .then(() => {
        props.navigation.navigate('Login');
        Toast.show({
          text: 'Password was succesfully changed',
          buttonText: 'Okay'
        })
      }).catch(() => {

      })
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <ScrollView>
      <Header transparent>
        <Left>
          <Button transparent onPress={goBack}>
            <AntDesign name='arrowleft' size={30} />
          </Button>
        </Left>
        <Body>
          {/* <Title>Sign Up</Title> */}
        </Body>
        <Right />
      </Header>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        <View>
          <Text style={styles.viewHeader}>
            {'Create your password!'}
          </Text>
          <Text style={styles.viewDescription}>
            {'To protect your account with all your data you should create a hard password! Just type your password in the field below and we will provide feedback about it.'}
          </Text>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.inputWrapperPassword}>
          <TextField
              label='Old Password'
              autoCompleteType={'password'}
              secureTextEntry={true}
              returnKeyType='done'
              autoCapitalize='none'
              value={newPassword}
              onChangeText={(value: string) => setNewPassword(value)}
              tintColor={'#fe4b66'}
              style={{ width: 200 }}
            />
            <TextField
              label='New Password'
              autoCompleteType={'password'}
              secureTextEntry={true}
              returnKeyType='done'
              autoCapitalize='none'
              value={newPassword}
              onChangeText={(value: string) => setNewPassword(value)}
              tintColor={'#fe4b66'}
              style={{ width: 200 }}
            />
            <BarPasswordStrengthDisplay
              password={newPassword}
              minLength={1}
              width={(screenWidth - 60)}
              scoreLimit={100}
            />
            <TextField
              label='Confirm new password'
              autoCompleteType={'password'}
              secureTextEntry={true}
              returnKeyType='done'
              autoCapitalize='none'
              value={confirmedPassword}
              onChangeText={(value: string) => setConfirmedPassword(value)}
              tintColor={'#fe4b66'}
              style={{ width: 200 }}
            />
          </View>
          <Button full style={styles.button} onPress={toNextScreen}>
            <Text>
              {'Next'}
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
  contentWrapper: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%'
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
    paddingTop: 5
  },
  basicText: {
    color: '#b0b1b2'
  },
  linkText: {
    color: '#fe4b66',
    paddingLeft: 10
  },
  inputWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: 10
  },
  inputWrapperPassword: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  viewHeader: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 0,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center'
  },
  viewDescription: {
    padding: 20,
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#595959'
  }
})
