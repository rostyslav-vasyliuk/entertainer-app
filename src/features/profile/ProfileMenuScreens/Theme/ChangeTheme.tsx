import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox, Header, Left, Body, Right } from 'native-base';
import { DARK_BACKGROUND, LIGHT_BACKGROUD, getTheme } from '../../../../constants/color-constants';

const ChangeTheme = (props) => {
  console.log(props.theme);
  const onThemeChange = (theme) => {
    props.changeColourTheme(theme);
  }

  const styles = getTheme ? stylesLight : stylesDark;
  console.log(styles)
  return (
    <>
      <Header>
        <Left />
        <Body>
          <Text>Change Theme</Text>
        </Body>
        <Right>
        </Right>
      </Header>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => onThemeChange('light')}>
          <View>
            <CheckBox checked={props.theme === 'light'} />
            <Text>
              {'Light'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onThemeChange('dark')}>
          <View>
            <CheckBox checked={props.theme === 'dark'} />
            <Text>
              {'Dark'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ChangeTheme;


const stylesLight = StyleSheet.create({
  wrapper: {
    backgroundColor: LIGHT_BACKGROUD,
    flex: 1
  }
})

const stylesDark = StyleSheet.create({
  wrapper: {
    backgroundColor: DARK_BACKGROUND,
    flex: 1
  }
})
