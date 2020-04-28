import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { screenWidth } from '../../constants/screen-contants';
import AvatarComponent from './AvatarComponent';
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { favouriteButtons, accountButtons } from './constants';
import { Header, Body, Left, Right } from 'native-base';
import LogoutModal from '../modals/LogoutModal.container';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY, BACKGROUND_LIGHT, BACKGROUND } from '../../constants/color-constants';
import HeaderCustom from '../../ui-components/Header/Header';

const BASE_SIZE = 16;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = '#FFFFFF';
const COLOR_GREY = '#9FA5AA';
const gradientColors = true ? GRADIENT_BLUE : GRADIENT_PINK;

const Profile = (props) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

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
              <MaterialIcons name='chevron-right' size={BASE_SIZE * 1.5} />
            </View>
          </View>
        </TouchableOpacity>
        {!isLastButton && <Divider />}
      </>
    )
  }

  return (
    <>
      <HeaderCustom label={'Profile'} />
      <ScrollView style={{backgroundColor: BACKGROUND}}>
        <View style={styles.wrapper}>

          <AvatarComponent user={{}} />
          <Text style={styles.textStyle}>
            {`Petro Mostavchuk`}
          </Text>

          <Text style={styles.cityTextStyle}>
            {`Ukraine, Lviv`}
          </Text>

          <Text style={styles.profileHeader}>
            {'Favourites'}
          </Text>
          <View style={styles.profileCompleteWrapper}>
            {favouriteButtons.map((button, index) => (
              renderMenuButton(button, Boolean(index === favouriteButtons.length - 1))
            ))}
          </View>

          <Text style={styles.profileHeader}>
            {'Settings'}
          </Text>
          <View style={styles.profileCompleteWrapper}>
            {accountButtons.map((button, index) => (
              renderMenuButton(button, Boolean(index === accountButtons.length - 1))
            ))}
          </View>
        </View>
      </ScrollView>

      <LogoutModal />
    </>
  )
}

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    backgroundColor: BACKGROUND
  },
  textStyle: {
    fontSize: 22,
    color: TEXT_COLOR,
    marginTop: 15,
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 5,
    color: TEXT_COLOR_SECONDARY
  },
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
  profileCompleteHeader: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16
  },
  progressbarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  profileMenuWrapper: {

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
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
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
    width: screenWidth - 65 - 60
  },
  menuTextLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1.1
  },
  menuTextDesc: {
    fontSize: 12,
    paddingTop: 2,
    color: 'gray'
  },
  menuArrow: {
    width: 60
  },
  profileHeader: {
    textAlign: 'left',
    width: screenWidth,
    paddingTop: 20,
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5
  },
  cityTextStyle: {
    color: 'gray',
    padding: 4,
    fontSize: 16
  }
})
