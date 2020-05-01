
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HeaderCustom from '../../../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, BUTTON_COLOR } from '../../../../../constants/color-constants';
import { Button, Text } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { screenHeight } from '../../../../../constants/screen-contants';
import { Axios } from '../../../../../api/instance';
import { AxiosResponse } from 'axios';

const ChangeEmail = (props) => {
  const [email, setEmail] = useState(props.userData.email);

  const goBack = () => {
    props.navigation.goBack();
  }

  const onSubmit = () => {
    const body = {
      email
    }

    Axios.post('/profile/update-profile', body).then((response: AxiosResponse) => {
      props.setUserData(response.data);
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
            <Text style={styles.buttonLabel}>
              {'Update'}
            </Text>
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
  datePickerContainer: {
    position: 'absolute',
    top: screenHeight - 368,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#e3e3e3',
    borderRadius: 10,
    zIndex: 2
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  birthdateWrapper: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    flexDirection: 'row'
  },
  countryWrapper: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    flexDirection: 'row',
    marginBottom: 15
  },
  sexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 20
  },
  sexText: {
    textAlign: 'center',
    fontWeight: '600',
    color: TEXT_COLOR
  },
  sexImage: {
    width: 100,
    height: 100
  },
  activeSexImage: {
    borderWidth: 5,
    borderRadius: 50,
    borderColor: BUTTON_COLOR
  }
})
