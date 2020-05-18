import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Text, Toast } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { Axios } from '../../../../api/instance';
import { screenWidth } from '../../../../constants/screen-contants';
import { TEXT_COLOR, BACKGROUND, TEXT_COLOR_SECONDARY, BACKGROUND_LIGHT, LOADER_COLOR } from '../../../../constants/color-constants';
import HeaderCustom from '../../../../ui-components/Header/Header';

const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    setIsLoading(true);
    Axios.post('/profile/password', { oldPassword, newPassword })
      .then(() => {
        props.navigation.navigate('Profile');
        setIsLoading(false);
        Toast.show({
          text: 'Password was succesfully changed',
          buttonText: 'Okay'
        })
      }).catch(() => {
        setIsLoading(false);
      })
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <ScrollView style={{ backgroundColor: BACKGROUND }}>
      <HeaderCustom back={goBack} label={'New Password'} />
      <View style={{ backgroundColor: BACKGROUND, height: '100%' }}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
          <View>
            <Text style={styles.viewHeader}>
              {'Change your password'}
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
                baseColor={TEXT_COLOR}
                textColor={TEXT_COLOR}
                value={oldPassword}
                onChangeText={(value: string) => setOldPassword(value)}
                tintColor={'#fe4b66'}
                style={{ width: 200 }}
              />
              <TextField
                label='New Password'
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
                label='Confirm new password'
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
              {isLoading ? (
                <ActivityIndicator color={LOADER_COLOR} size='small' />
              ) : (
                  <Text>
                    {'Submit'}
                  </Text>
                )}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
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
  inputWrapperPassword: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  viewHeader: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 0,
    fontSize: 20,
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
