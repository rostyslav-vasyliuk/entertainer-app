import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Header, Left, Body, Right, Text } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { screenWidth } from '../../../constants/screen-contants';
import Stepper from '../../../ui-components/stepper/Stepper';
import BackArrow from '../../../ui-components/BackArrow/BackArrow';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';

const FirstLastNameScreen = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  }
  const toNextScreen = () => {
    props.setFirstLastName(firstname, lastname);
    props.navigation.push('CountryScreen');
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <>
      {/* <StatusBar barStyle={'light-content'}/> */}
      <Header transparent style={{backgroundColor: BACKGROUND}}>
        <Left>
          <TouchableOpacity onPress={goBack}>
            <BackArrow />
          </TouchableOpacity>
        </Left>
        <Body>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
          <Stepper amount={4} activeIndex={0} />
          <View>
            <Text style={styles.viewHeader}>
              {'Create your account!'}
            </Text>
            <Text style={styles.viewDescription}>
              {'Introduce yourself, we all want to hear your name!'}
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextField
              value={firstname}
              onChangeText={(firstname) => setFirstname(firstname)}
              label='Firstname'
              returnKeyType='next'
              autoCompleteType={'email'}
              autoCapitalize='sentences'
              tintColor={'#fe4b66'}
              baseColor={TEXT_COLOR}
              textColor={TEXT_COLOR}
              style={{ width: 200 }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextField
              value={lastname}
              onChangeText={(lastname) => setLastname(lastname)}
              label='Lastname'
              returnKeyType='next'
              autoCapitalize='sentences'
              tintColor={'#fe4b66'}
              baseColor={TEXT_COLOR}
              textColor={TEXT_COLOR}
              style={{ width: 150 }}
            />
          </View>
          <Button full style={styles.button} onPress={toNextScreen}>
            <Text>
              {'Next'}
            </Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

export default FirstLastNameScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: screenWidth,
    height: '100%',
    backgroundColor: BACKGROUND
  },
  inputWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  button: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
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
    padding: 35,
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: TEXT_COLOR_SECONDARY
  }
})
