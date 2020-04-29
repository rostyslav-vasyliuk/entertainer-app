import React, { useState } from 'react';
import { Textarea, Button, CheckBox } from 'native-base';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { screenWidth } from '../../../constants/screen-contants';
import HeaderCustom from '../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR_SECONDARY, TEXT_COLOR } from '../../../constants/color-constants';
import * as Device from 'expo-device';

const Feedback = (props) => {
  const [feedbackText, setFeedbackText] = useState('');

  const onBack = () => {
    props.navigation.goBack();
  }

  const getDeviceInfo = () => {
    const deviceInfo = {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      modelName: Device.modelName,
      yearClass: Device.deviceYearClass,
      memory: Device.totalMemory,
      architecture: Device.supportedCpuArchitectures,
      osName: Device.osName,
      osVersion: Device.osVersion
    }
    console.log(deviceInfo);
  }
  return (
    <>
      <HeaderCustom label={'Feedback'} back={onBack} />
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={{ padding: 10 }}>
          <Text style={styles.labelDescription}>
            {'Leave feedback for us!'}
          </Text>
          <Text style={styles.labelDescription2}>
            {'We will although include information about your device in case you have some issues'}
          </Text>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
              <CheckBox color={'#fe4b66'} />
              <Text style={styles.checkboxLabel}>
                {'Leave app feedback'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
              <CheckBox color={'#fe4b66'} checked={true} />
              <Text style={styles.checkboxLabel}>
                {'Request improvment'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
              <CheckBox color={'#fe4b66'} />
              <Text style={styles.checkboxLabel}>
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
              style={{ color: TEXT_COLOR }}
              onChangeText={(feedbackText) => setFeedbackText(feedbackText)}
              underline={true}
            />
          </View>

          <Button style={styles.button} full onPress={() => getDeviceInfo()}>
            <Text style={{ color: 'white' }}>
              {'Send'}
            </Text>
          </Button>
        </View>
      </ScrollView>
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
  checkboxLabel: {
    paddingLeft: 20,
    color: TEXT_COLOR,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1.05
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
    paddingBottom: 5,
    fontSize: 18,
    paddingTop: 5,
    fontWeight: '600',
    color: TEXT_COLOR
  },
  labelDescription2: {
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: 12,
    paddingTop: 5,
    fontWeight: '500',
    color: TEXT_COLOR_SECONDARY
  },
  buttonsWrapper: {
    width: screenWidth,
    paddingTop: 40
  }
})
