import React, { useState } from 'react';
import { Header, Body, Left, Right, Textarea, Form, Item, Label, Button, CheckBox } from 'native-base';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { screenWidth } from '../../../constants/screen-contants';

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState('');

  return (
    <>
      <Header>
        <Left />
        <Body>
          <Text>Feedback</Text>
        </Body>
        <Right>
        </Right>
      </Header>
      <View style={{ padding: 10 }}>
        <Text style={styles.labelDescription}>
          {'Choose type of feedback you want to leave with clicking on the checkbox. Your opinion is very important to us!'}
        </Text>

        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
            <CheckBox color={'#fe4b66'} />
            <Text style={{ paddingLeft: 20 }}>
              {'Leave app feedback'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
            <CheckBox color={'#fe4b66'} />
            <Text style={{ paddingLeft: 20 }}>
              {'Request improvment'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
            <CheckBox color={'#fe4b66'} />
            <Text style={{ paddingLeft: 20 }}>
              {'Request a bug'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ paddingTop: 15 }}>
          <Textarea
            rowSpan={8}
            bordered
            placeholder="Type your feedback here..."
            value={feedbackText}
            onChangeText={(feedbackText) => setFeedbackText(feedbackText)}
            underline={true}
          />
        </View>

        <Button style={styles.button} full>
          <Text style={{ color: 'white' }}>
            Send
          </Text>
        </Button>
      </View>
    </>
  )
}

export default Feedback;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fe4b66'
  },
  loginButton: {
    margin: 10,
    marginTop: 0,
    marginRight: 30,
    marginLeft: 30,
    height: 50,
    borderRadius: 5,
    color: '#fe4b66'
    // backgroundColor: '#fe4b66'
  },
  additionalLink: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicText: {
    color: '#b0b1b2'
  },
  linkText: {
    color: '#fe4b66',
    paddingLeft: 10
  },
  labelHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500'
  },
  labelDescription: {
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    color: '#000'
  },
  buttonsWrapper: {
    width: screenWidth,
    paddingTop: 40
  }
})
