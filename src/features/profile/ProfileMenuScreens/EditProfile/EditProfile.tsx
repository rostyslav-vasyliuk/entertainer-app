import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, Text } from 'react-native';
import HeaderCustom from '../../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, BUTTON_COLOR, TEXT_COLOR_SECONDARY, BACKGROUND_LIGHT } from '../../../../constants/color-constants';
import { screenHeight, screenWidth } from '../../../../constants/screen-contants';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { editProfileListItems } from '../constants';

const BASE_SIZE = 16;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = '#FFFFFF';

const gradientColors = true ? GRADIENT_BLUE : GRADIENT_PINK;

const EditProfile = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  }

  const onProfileNavigate = (component: string) => {
    if (!component) {
      return;
    }
    props.navigation.push(component);
  }

  const renderMenuButton = (button, isLastButton) => {
    const iconProps: any = {
      size: BASE_SIZE + 12,
      name: button.icon,
      color: COLOR_WHITE
    }

    let icon: JSX.Element = null;

    if (button.fontFamily === 'Ionicons') {
      icon = <Ionicons {...iconProps} />;
    } else if (button.fontFamily === 'MaterialIcons') {
      icon = <MaterialIcons {...iconProps} />;
    } else if (button.fontFamily === 'FontAwesome5') {
      icon = <FontAwesome5 {...iconProps} />;
    } else if (button.fontFamily === 'MaterialCommunityIcons') {
      icon = <MaterialCommunityIcons {...iconProps} />;
    } else if (button.fontFamily === 'FontAwesome') {
      icon = <FontAwesome {...iconProps} />;
    }

    let onButtonAction = () => {
      if (button.buttonLabel === 'Logout') {
        props.setIsLogoutModalVisible(true);
        return;
      }
      onProfileNavigate(button.link)
    }

    return (
      <>
        <TouchableOpacity activeOpacity={0.6} onPress={() => onButtonAction()}>
          <View style={styles.menuButtonWrapper}>
            <View style={styles.menuIcon}>
              <Gradient
                start={[0.45, 0.45]}
                end={[0.90, 0.90]}
                colors={button.gradientColors || ['#fff']}
                style={[styles.gradient, styles.left]}
              >
                {icon}
              </Gradient>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTextLabel}>
                {button.buttonLabel}
              </Text>
              <Text style={styles.menuTextDesc}>
                {button.buttonDescription}
              </Text>
            </View>
            <View style={styles.menuArrow}>
              <MaterialIcons name='chevron-right' size={BASE_SIZE * 1.5} style={{ color: TEXT_COLOR_SECONDARY }} />
            </View>
          </View>
        </TouchableOpacity>
        {!isLastButton && <Divider />}
      </>
    )
  }

  return (
    <>
      <HeaderCustom label={'Edit Profile'} back={goBack} />
      <ScrollView style={{ backgroundColor: BACKGROUND }} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.profileCompleteWrapper}>
          {editProfileListItems.map((item, index) => (
            renderMenuButton(item, Boolean(index === editProfileListItems.length - 1))
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default EditProfile;

const styles = StyleSheet.create({
  profileCompleteWrapper: {
    backgroundColor: BACKGROUND_LIGHT,
    width: '95%',
    // margin: 50,
    marginTop: 15,
    marginBottom: 15,
    padding: 7,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 1,
  },
  menuButtonWrapper: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  left: {
    marginRight: BASE_SIZE,
  },
  gradient: {
    width: BASE_SIZE * 3,
    height: BASE_SIZE * 3,
    borderRadius: BASE_SIZE * 1.2 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    paddingLeft: 5,
    width: 65
  },
  menuText: {
    width: screenWidth - 65 - 60,
    color: TEXT_COLOR
  },
  menuTextLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: TEXT_COLOR
  },
  menuTextDesc: {
    fontSize: 12,
    paddingTop: 2,
    color: TEXT_COLOR_SECONDARY
  },
  menuArrow: {
    width: 60
  },
})
