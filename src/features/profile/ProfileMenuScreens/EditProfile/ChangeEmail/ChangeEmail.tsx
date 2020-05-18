
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderCustom from '../../../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, BUTTON_COLOR, LOADER_COLOR } from '../../../../../constants/color-constants';
import { Button, Text, Toast } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { Axios } from '../../../../../api/instance';
import { AxiosResponse } from 'axios';

const ChangeEmail = (props) => {
  const [email, setEmail] = useState(props.userData.email);
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    props.navigation.goBack();
  }

  const onSubmit = () => {
    const body = {
      email
    }

    setIsLoading(true);

    Axios.post('/profile/update-profile', body).then((response: AxiosResponse) => {
      setIsLoading(false);
      props.setUserData(response.data);
      Toast.show({
        text: 'Your changes was saved',
        buttonText: 'Okay'
      })
    }).catch(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <HeaderCustom label={'Change Email'} back={goBack} />
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <TextField
              value={email}
              onChangeText={(email) => setEmail(email)}
              label='Email'
              returnKeyType='next'
              autoCompleteType={'email'}
              autoCapitalize='sentences'
              tintColor={'#fe4b66'}
              baseColor={TEXT_COLOR}
              textColor={TEXT_COLOR}
              style={{ width: 200 }}
            />
          </View>

          <Button full style={styles.button} onPress={onSubmit}>
            {isLoading ? (
              <ActivityIndicator color={LOADER_COLOR} size='small' />
            ) : (
                <Text style={styles.buttonLabel}>
                  {'Update'}
                </Text>
              )}
          </Button>
        </View>
      </ScrollView>
    </>
  )
}

export default ChangeEmail;

const styles = StyleSheet.create({
  wrapper: {

  },
  button: {
    backgroundColor: BUTTON_COLOR,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    borderRadius: 4
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: TEXT_COLOR
  },
  inputWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
})
