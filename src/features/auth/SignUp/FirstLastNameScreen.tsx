import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Button, Header, Left, Body, Right, Text } from 'native-base';
import { AntDesign } from 'react-native-vector-icons';
import { TextField } from 'react-native-material-textfield';
import { screenWidth } from '../../../constants/screen-contants';
import Stepper from '../../../ui-components/stepper/Stepper';

const FirstLastNameScreen = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  }
  const toNextScreen = () => {
    props.navigation.navigate('CountryScreen');
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <View>
      <Header transparent>
        <Left>
          <Button transparent onPress={goBack}>
            <AntDesign name='arrowleft' size={30} />
          </Button>
        </Left>
        <Body>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
        <Stepper amount={4} activeIndex={0}/>
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
              label='Firstname'
              returnKeyType='next'
              autoCompleteType={'email'}
              autoCapitalize='sentences'
              tintColor={'#fe4b66'}
              style={{ width: 200 }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextField
              label='Lastname'
              returnKeyType='next'
              autoCapitalize='sentences'
              tintColor={'#fe4b66'}
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
    </View>
  );
}

export default FirstLastNameScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: screenWidth,
    height: '100%',
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
    textAlign: 'center'
  },
  viewDescription: {
    padding: 35,
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#595959'
  }
})