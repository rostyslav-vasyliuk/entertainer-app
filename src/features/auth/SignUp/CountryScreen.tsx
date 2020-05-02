import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import { Button, Header, Left, Body, Right, Text } from 'native-base';
import { screenHeight } from '../../../constants/screen-contants';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker, { Country, CountryCode, DARK_THEME } from 'react-native-country-picker-modal';
import Stepper from '../../../ui-components/stepper/Stepper';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY, BUTTON_COLOR, BACKGROUND_LIGHT } from '../../../constants/color-constants';
import BackArrow from '../../../ui-components/BackArrow/BackArrow';

const ContryScreen = (props) => {
  const [countryCode, setCountryCode] = useState<CountryCode>(null);
  const [countryName, setCountryName] = useState<any>('');
  const [gender, setGender] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [displayDate, setDisplayDate] = useState(null);
  const [show, setShow] = useState(false);

  const goBack = () => {
    props.navigation.goBack();
  }

  const toNextScreen = () => {
    props.setCountryBirthGender(countryName, date, gender);
    props.navigation.push('PasswordScreen')
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const onCountryPickerSelect = (country: Country) => {
    console.log(country)
    setCountryName(country.name);
    setCountryCode(country.cca2);
  }

  const setSexProperty = (genderIndex: number) => {
    setGender(genderIndex ? 'Female' : 'Male');
  }

  const onDataPickerClose = () => {
    setShow(false);
  }

  const onDataPickerConfirm = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = date.toLocaleString('en-US', options);
    setDisplayDate(displayDate);
    setShow(false);
  }

  return (
    <View>
      <Header transparent style={{ backgroundColor: BACKGROUND }}>
        <Left>
          <TouchableOpacity onPress={goBack}>
            <BackArrow />
          </TouchableOpacity>
        </Left>
        <Body>
        </Body>
        <Right />
      </Header>
      <View style={{ backgroundColor: BACKGROUND, height: '100%' }}>
        <View>
          <Text style={styles.viewHeader}>
            {`Hello, ${props.firstname} ${props.lastname}!`}
          </Text>
          <Text style={styles.viewDescription}>
            {'We need some additional info about you, please fill just right here!'}
          </Text>
        </View>
        <View style={styles.sexWrapper}>
          <TouchableOpacity onPress={() => setSexProperty(0)}>
            <Image
              style={[styles.sexImage, gender === 'Male' && styles.activeSexImage]}
              source={require('../../../assets/male.png')}
            />
            <Text style={styles.sexText}>
              {'I am Male'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSexProperty(1)}>
            <Image
              style={[styles.sexImage, gender === 'Female' && styles.activeSexImage]}
              source={require('../../../assets/female.png')}
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
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
              textColor='#FFFFFF'
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
        <Button full style={styles.button} onPress={toNextScreen}>
          <Text>
            {'Next'}
          </Text>
        </Button>
      </View>
    </View >
  );
}

export default ContryScreen;

const styles = StyleSheet.create({
  button: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
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
  },
  datePickerContainer: {
    position: 'absolute',
    top: screenHeight - 325,
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
    paddingBottom: 20
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
