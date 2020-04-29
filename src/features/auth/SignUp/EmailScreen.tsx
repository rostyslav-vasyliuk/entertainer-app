import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Header, Left, Body, Right, Text } from 'native-base';
// import { AntDesign } from 'react-native-vector-icons';
import { TextField } from 'react-native-material-textfield';
import BackArrow from '../../../ui-components/BackArrow/BackArrow';
import { BACKGROUND_LIGHT, HEADER_BACKGROUND, BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
// import Stepper from '../../../ui-components/stepper/Stepper';

const EmailScreen = (props) => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    props.setEmail(email);
    props.navigation.push('FirstLastNameScreen');
  }

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const onChange = (email: string) => {
    setEmail(email);

    if (validateEmail(email)) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true);
    }
  }
  return (
    <>
      <StatusBar barStyle='light-content' />
      <View>
        <Header transparent style={{ backgroundColor: BACKGROUND }}>
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
        <View style={styles.contentWrapper}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            {/* <Stepper amount={4} activeIndex={1} /> */}
            <View>
              <Text style={styles.viewHeader}>
                {'Please provide your email!'}
              </Text>
              <Text style={styles.viewDescription}>
                {'In case of forgotting password or any danger of your account with your email we can easily provide you our service.'}
              </Text>
            </View>
            <View>
              <View style={styles.inputWrapper}>
                <TextField
                  value={email}
                  onChangeText={(email) => onChange(email)}
                  label='Email'
                  returnKeyType='next'
                  autoCapitalize='none'
                  tintColor={'#fe4b66'}
                  baseColor={TEXT_COLOR}
                  textColor={TEXT_COLOR}
                  style={{ width: 200 }}
                />
              </View>
              <Button
                // disabled={isButtonDisabled}
                full
                style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
                onPress={toNextScreen}
              >
                <Text>
                  {'Next'}
                </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
}


export default EmailScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    height: '100%',
    backgroundColor: BACKGROUND
  },
  button: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
  inputWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: 10
  },
  viewTitle: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
    fontSize: 23,
    fontWeight: '600',
    textAlign: 'center'
  },
  viewHeader: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: TEXT_COLOR
  },
  viewDescription: {
    padding: 35,
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: TEXT_COLOR_SECONDARY
  },
})
