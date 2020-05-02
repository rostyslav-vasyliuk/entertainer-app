import React, { useState } from 'react';
import { Textarea, Button, CheckBox } from 'native-base';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { screenWidth } from '../../../constants/screen-contants';
import HeaderCustom from '../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR_SECONDARY, TEXT_COLOR, LOADER_COLOR } from '../../../constants/color-constants';
import * as Device from 'expo-device';
import { Axios } from '../../../api/instance';
import FeedbackSuccessModal from '../../modals/FeedbackSuccessModal.container';

const Feedback = (props) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onBack = () => {
    props.navigation.goBack();
  }

  const onFeedbackSubmit = () => {
    setIsLoading(true);
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

    const body = {
      deviceInfo,
      type: activeCheckbox,
      feedbackText
    }

    Axios.post('/profile/feedback', body).then(() => {
      props.setIsFeedbackModalVisible(true);
      setIsLoading(false);
    })
  }

  const changeCategory = (type) => {
    setActiveCheckbox(type)
  }
  return (
    <>
      <HeaderCustom label={'Support'} back={onBack} />
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={{ padding: 10 }}>
          <Text style={styles.labelDescription}>
            {'Leave feedback for us!'}
          </Text>
          <Text style={styles.labelDescription2}>
            {'We will although include information about your device so no need to describe it in description'}
          </Text>

          <TouchableOpacity onPress={() => changeCategory('support')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
              <CheckBox color={'#fe4b66'} checked={activeCheckbox === 'support'} />
              <Text style={styles.checkboxLabel}>
                {'Request support'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeCategory('feedback')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
              <CheckBox color={'#fe4b66'} checked={activeCheckbox === 'feedback'} />
              <Text style={styles.checkboxLabel}>
                {'Leave app feedback'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeCategory('bug')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
              <CheckBox color={'#fe4b66'} checked={activeCheckbox === 'bug'} />
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

          <Button style={styles.button} full onPress={() => onFeedbackSubmit()}>
            {isLoading ?
              (
                <View>
                  <ActivityIndicator color={LOADER_COLOR} />
                </View>
              ) : (
                <Text style={{ color: 'white' }}>
                  {'Send'}
                </Text>
              )}
          </Button>
        </View>
      </ScrollView>
      <FeedbackSuccessModal navigation={props.navigation} />
    </>
  )
}

export default Feedback;

const styles = StyleSheet.create({
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
})
