import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator } from 'react-native';
import HeaderCustom from '../../../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, BUTTON_COLOR, LOADER_COLOR } from '../../../../../constants/color-constants';
import { Button, Text } from 'native-base';
import { screenHeight } from '../../../../../constants/screen-contants';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker, { Country, CountryCode, DARK_THEME } from 'react-native-country-picker-modal';
import { Axios } from '../../../../../api/instance';
import { AxiosResponse } from 'axios';

const ChangeInfo = (props) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const [country, setCountry] = useState(props.userData.country);
  const [countryCode, setCountryCode] = useState<CountryCode>(props.userData.countryCode);
  const [birthdate, setBirthdate] = useState(props.userData.birthdate.toLocaleString('en-US', options));
  const [gender, setGender] = useState(props.userData.gender);
  const [isLoading, setIsLoading] = useState(false);

  const [displayDate, setDisplayDate] = useState(new Date(props.userData.birthdate).toLocaleString('en-US', options));
  const [show, setShow] = useState(false);

  const onDateChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate || birthdate;

    setBirthdate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const onCountryPickerSelect = (country: Country) => {
    setCountry(country.name);
    setCountryCode(country.cca2);
  }

  const setSexProperty = (genderIndex: number) => {
    setGender(genderIndex ? 'Female' : 'Male');
  }

  const onDataPickerClose = () => {
    setShow(false);
  }

  const onDataPickerConfirm = () => {
    const displayDate = birthdate.toLocaleString('en-US', options);
    setDisplayDate(displayDate);
    setShow(false);
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const onSubmit = () => {
    const body = {
      country,
      countryCode,
      birthdate,
      gender
    }
    setIsLoading(true);

    Axios.post('/profile/update-profile', body).then((response: AxiosResponse) => {
      props.setUserData(response.data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <HeaderCustom label={'Edit Profile Info'} back={goBack} />
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.wrapper}>

          <View style={styles.sexWrapper}>
            <TouchableOpacity onPress={() => setSexProperty(0)}>
              <Image
                style={[styles.sexImage, gender === 'Male' && styles.activeSexImage]}
                source={require('../../../../../assets/male.png')}
              />
              <Text style={styles.sexText}>
                {'I am Male'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSexProperty(1)}>
              <Image
                style={[styles.sexImage, gender === 'Female' && styles.activeSexImage]}
                source={require('../../../../../assets/female.png')}
              />
              <Text style={styles.sexText}>
                {'I am Female'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.birthdateWrapper}>
            <Text style={{ color: TEXT_COLOR }}>
              {'Your birthdate:'}
            </Text>
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={{ color: TEXT_COLOR }}>
                {displayDate ? displayDate : 'Click to select date'}
              </Text>
            </TouchableOpacity>
          </View>
          {show &&
            <View style={styles.datePickerContainer}>
              <View style={styles.buttonsWrapper}>
                <Button transparent onPress={onDataPickerClose}>
                  <Text style={{ color: BUTTON_COLOR }}>
                    {'Close'}
                  </Text>
                </Button>
                <Button transparent onPress={onDataPickerConfirm}>
                  <Text style={{ color: BUTTON_COLOR }}>
                    {'Confirm'}
                  </Text>
                </Button>
              </View>
              <DateTimePicker
                timeZoneOffsetInMinutes={0}
                value={birthdate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onDateChange}
              />
            </View>
          }
          <View style={styles.countryWrapper}>
            <Text style={{ color: TEXT_COLOR }}>
              {'Your country:'}
            </Text>
            <TouchableOpacity onPress={showDatepicker}>
              <CountryPicker
                countryCode={countryCode}
                onSelect={onCountryPickerSelect}
                withCountryNameButton
                withCloseButton
                withFilter
                withFlag
                visible={false}
                theme={DARK_THEME}
              />
            </TouchableOpacity>
          </View>


          <Button full style={styles.button} onPress={onSubmit}>
            {isLoading ? (
              <ActivityIndicator color={LOADER_COLOR} size='small' />
            ) : (
                <Text style={styles.buttonLabel}>
                  {'Update profile'}
                </Text>
              )}
          </Button>
        </View>
      </ScrollView>
    </>
  )
}

export default ChangeInfo;

const styles = StyleSheet.create({
  wrapper: {
    // padding: 10
  },
  button: {
    backgroundColor: BUTTON_COLOR,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 4,
    marginTop: 10
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: TEXT_COLOR
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
