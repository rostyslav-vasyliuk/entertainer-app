import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native';
import { Button, Text, Toast } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { Axios } from '../../../api/instance';
import { AxiosResponse, AxiosError } from 'axios';
import HeaderCustom from '../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';

const EnterEmail = (props) => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    setIsLoading(true);
    Keyboard.dismiss();
    Axios.post('/auth/forgot-password-pending', { email })
      .then((response: AxiosResponse) => {
        props.navigation.push('VerificationComponent', {
          email,
          'forgot-password-token': response.headers['forgot-password-token']
        });
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        Toast.show({
          text: "User doesnt exist!",
          buttonText: "Okay",
          position: "bottom"
        });
        setIsLoading(false);
      })
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

  const renderButtonInner = () => {
    if (isLoading) {
      return (
        <ActivityIndicator color={'#fff'} />
      )
    }
    return (
      <Text>
        {'Next'}
      </Text>
    )
  }

  return (
    <View>
      <HeaderCustom back={goBack} label={'Forgot Password'}/>
      <View style={styles.contentWrapper}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
          <View>
            <Text style={styles.viewHeader}>
              {'Please provide your email'}
            </Text>
            <Text style={styles.viewDescription}>
              {'For recovering of your account put down address you\'ve used for registration'}
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
              full
              style={styles.button}
              onPress={toNextScreen}
            >
              {renderButtonInner()}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}


export default EnterEmail;

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
  inputWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: 10
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
