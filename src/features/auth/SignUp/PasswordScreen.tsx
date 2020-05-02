import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, Header, Left, Body, Right, Text } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { screenWidth } from '../../../constants/screen-contants';
import { TEXT_COLOR, BACKGROUND, TEXT_COLOR_SECONDARY, BACKGROUND_LIGHT } from '../../../constants/color-constants';
import BackArrow from '../../../ui-components/BackArrow/BackArrow';

const PasswordScreen = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    props.setPassword(newPassword);
    props.navigation.push('SignUpSuccessScreen');
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <ScrollView style={{ backgroundColor: BACKGROUND }}>
      <Header transparent>
        <Left>
          <TouchableOpacity onPress={goBack}>
            <BackArrow />
          </TouchableOpacity>
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
              label='Password'
              autoCompleteType={'password'}
              secureTextEntry={true}
              returnKeyType='done'
              autoCapitalize='none'
              value={newPassword}
              onChangeText={(value: string) => setNewPassword(value)}
              tintColor={'#fe4b66'}
              baseColor={TEXT_COLOR}
              textColor={TEXT_COLOR}
              style={{ width: 200 }}
            />
            <BarPasswordStrengthDisplay
              password={newPassword}
              minLength={1}
              width={(screenWidth - 60)}
              scoreLimit={100}
              // barContainerStyle={{backgroundColor: 'yellow'}}
              barColor={BACKGROUND_LIGHT}
            />
            <TextField
              label='Confirm password'
              autoCompleteType={'password'}
              secureTextEntry={true}
              returnKeyType='done'
              autoCapitalize='none'
              value={confirmedPassword}
              onChangeText={(value: string) => setConfirmedPassword(value)}
              tintColor={'#fe4b66'}
              baseColor={TEXT_COLOR}
              textColor={TEXT_COLOR}
              style={{ width: 200, paddingTop: 0 }}
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

export default PasswordScreen;

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
