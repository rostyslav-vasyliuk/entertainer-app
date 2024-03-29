import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, Text, Toast } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { screenWidth } from '../../../constants/screen-contants';
import { Axios } from '../../../api/instance';
import HeaderCustom from '../../../ui-components/Header/Header';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY, BACKGROUND, BACKGROUND_LIGHT } from '../../../constants/color-constants';

const NewPasswordComponent = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    Keyboard.dismiss();
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
    <ScrollView style={{backgroundColor: BACKGROUND}}>
      <HeaderCustom back={goBack} label={'New Password'} />
      <View style={{ backgroundColor: BACKGROUND, height: '100%' }}>
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
                label='Password'
                autoCompleteType={'password'}
                secureTextEntry={true}
                returnKeyType='done'
                autoCapitalize='none'
                baseColor={TEXT_COLOR}
                textColor={TEXT_COLOR}
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
                barColor={BACKGROUND_LIGHT}
              />
              <TextField
                label='Confirm password'
                autoCompleteType={'password'}
                secureTextEntry={true}
                returnKeyType='done'
                autoCapitalize='none'
                value={confirmedPassword}
                baseColor={TEXT_COLOR}
                textColor={TEXT_COLOR}
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
      </View>
    </ScrollView>
  );
}

export default NewPasswordComponent;

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
    textAlign: 'center',
    color: TEXT_COLOR
  },
  viewDescription: {
    padding: 20,
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: TEXT_COLOR_SECONDARY
  }
})
