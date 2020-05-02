import React, { useState, useEffect } from 'react';
import { Header, Body, Left, Right, Switch } from 'native-base';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { screenWidth } from '../../../constants/screen-contants';
import { permissionsListItems } from './constants';
import { Divider } from 'react-native-elements';
import { CAMERA, CAMERA_ROLL, NOTIFICATIONS } from 'expo-permissions';
import * as Permissions from 'expo-permissions';
import HeaderCustom from '../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';

const BASE_SIZE = 16;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = '#FFFFFF';

const gradientColors = true ? GRADIENT_BLUE : GRADIENT_PINK;

const PermissionsComponent = (props) => {
  const [CAMERA_PERM, SET_CAMERA_PERM] = useState(false);
  const [CAMERA_ROLL_PERM, SET_CAMERA_ROLL_PERM] = useState(false);
  const [NOTIFICATIONS_PERM, SET_NOTIFICATIONS_PERM] = useState(false);

  useEffect(() => {
    const getCameraPermsAsync = async () => {
      const { status } = await Permissions.getAsync(CAMERA);
      if (status === 'granted') {
        SET_CAMERA_PERM(true);
      }
    }

    const getCameraRollPermsAsync = async () => {
      const { status } = await Permissions.getAsync(CAMERA_ROLL);
      if (status === 'granted') {
        SET_CAMERA_ROLL_PERM(true);
      }
    }

    const getNotificationsPermsAsync = async () => {
      const { status } = await Permissions.getAsync(NOTIFICATIONS);
      if (status === 'granted') {
        SET_NOTIFICATIONS_PERM(true);
      }
    }

    getCameraPermsAsync();
    getCameraRollPermsAsync();
    getNotificationsPermsAsync();

  }, [])

  const goBack = () => {
    props.navigation.goBack();
  }

  const getPermissions = (type) => {
    if (type === CAMERA) {
      return CAMERA_PERM;
    }

    if (type === CAMERA_ROLL) {
      return CAMERA_ROLL_PERM;
    }

    if (type === NOTIFICATIONS) {
      return NOTIFICATIONS_PERM;
    }
  }

  const askPermission = async (type) => {
    const { status } = await Permissions.askAsync(type);
    if (status === 'granted') {
      if (type === CAMERA) {
        SET_CAMERA_PERM(true)
      }

      if (type === CAMERA_ROLL) {
        SET_CAMERA_ROLL_PERM(true)
      }

      if (type === NOTIFICATIONS) {
        SET_NOTIFICATIONS_PERM(true)
      }
    }
  }

  const renderListItem = (listItem, isLastElement) => {
    const iconProps: any = {
      size: BASE_SIZE + 12,
      name: listItem.icon,
      color: COLOR_WHITE
    }

    let icon: JSX.Element = null;

    if (listItem.fontFamily === 'Ionicons') {
      icon = <Ionicons {...iconProps} />;
    } else if (listItem.fontFamily === 'MaterialIcons') {
      icon = <MaterialIcons {...iconProps} />;
    } else if (listItem.fontFamily === 'FontAwesome5') {
      icon = <FontAwesome5 {...iconProps} />;
    } else if (listItem.fontFamily === 'MaterialCommunityIcons') {
      icon = <MaterialCommunityIcons {...iconProps} />;
    } else if (listItem.fontFamily === 'FontAwesome') {
      icon = <FontAwesome {...iconProps} />;
    }

    return (
      <>
        <View style={styles.menuButtonWrapper}>
          <View style={styles.menuIcon}>
            <Gradient
              start={[0.45, 0.45]}
              end={[0.90, 0.90]}
              colors={listItem.gradientColors || gradientColors}
              style={[styles.gradient, styles.left]}
            >
              {icon}
            </Gradient>
          </View>
          <View style={styles.menuText}>
            <Text style={styles.menuTextLabel}>
              {listItem.label}
            </Text>
            <Text style={styles.menuTextDesc}>
              {listItem.description}
            </Text>
          </View>
          <View style={styles.menuArrow}>
            <Switch value={getPermissions(listItem.type)} onValueChange={() => askPermission(listItem.type)} />
          </View>
        </View>

        {!isLastElement && <Divider style={{ width: '90%' }} />}
      </>
    )
  }

  return (
    <>
      <HeaderCustom label={'Permissions'} back={goBack} />

      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.wrapper}>
          {permissionsListItems.map((item, index) => (
            renderListItem(item, Boolean(index === permissionsListItems.length - 1))
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default PermissionsComponent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 10
  },
  menuButtonWrapper: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth,
    alignItems: 'center',
    padding: 5
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
    width: screenWidth - 80 - 60,
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
    width: 80,
    paddingLeft: 10
  },
})
