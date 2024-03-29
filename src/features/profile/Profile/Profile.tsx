import React from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import { Divider } from 'react-native-elements';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { screenWidth } from '../../../constants/screen-contants';
import AvatarComponent from '../AvatarComponent/AvatarComponent.container';
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { favouriteButtons, accountButtons } from '../constants';
import LogoutModal from '../../modals/LogoutModal.container';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY, BACKGROUND_LIGHT, BACKGROUND, LOADER_COLOR } from '../../../constants/color-constants';
import HeaderCustom from '../../../ui-components/Header/Header';
import { useTranslation, withTranslation } from 'react-i18next';

const BASE_SIZE = 16;
const COLOR_WHITE = '#FFFFFF';

const Profile = (props) => {
  const { t } = useTranslation();

  const onProfileNavigate = (component: string) => {
    if (!component) {
      return;
    }
    props.navigation.push(component);
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false)
    }, 1000);

  }, [refreshing]);

  const RefreshController = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={LOADER_COLOR} />;

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
        <TouchableOpacity activeOpacity={0.6} onPress={() => onButtonAction()} key={button.buttonLabel}>
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
              {/* {button.buttonLabel === 'Preferences' && !hasUserPreferences() && <FontAwesome name='circle' style={{ marginLeft: -25, marginTop: -5, fontSize: 18 }} color={'#ffb854'} />} */}
            </View>
            <View style={styles.menuText}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.menuTextLabel}>
                  {t(button.buttonLabel)}
                </Text>
              </View>
              <Text style={styles.menuTextDesc}>
                {t(button.buttonDescription)}
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
      <HeaderCustom label={t('Profile')} />
      <ScrollView style={{ backgroundColor: BACKGROUND }} refreshControl={RefreshController}>
        <View style={styles.wrapper}>

          <AvatarComponent />
          <Text style={styles.textStyle}>
            {`${props.userData.firstname} ${props.userData.lastname}`}
          </Text>

          <Text style={styles.cityTextStyle}>
            {`${props.userData.country}`}
          </Text>

          <Text style={styles.profileHeader}>
            {t('Favourites')}
          </Text>
          <View style={styles.profileCompleteWrapper}>
            {favouriteButtons.map((button, index) => (
              renderMenuButton(button, Boolean(index === favouriteButtons.length - 1))
            ))}
          </View>

          <Text style={styles.profileHeader}>
            {t('Settings')}
          </Text>
          <View style={styles.profileCompleteWrapper}>
            {accountButtons.map((button, index) => (
              renderMenuButton(button, Boolean(index === accountButtons.length - 1))
            ))}
          </View>
        </View>
      </ScrollView>

      <LogoutModal navigation={props.navigation} />
    </>
  )
}

export default withTranslation()(Profile);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    marginBottom: 15,
    backgroundColor: BACKGROUND
  },
  textStyle: {
    fontSize: 22,
    color: TEXT_COLOR,
    marginTop: 15,
  },
  profileCompleteWrapper: {
    backgroundColor: BACKGROUND_LIGHT,
    width: '95%',
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
    width: 65,
    flexDirection: 'row'
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
  profileHeader: {
    textAlign: 'left',
    width: screenWidth,
    paddingTop: 20,
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: TEXT_COLOR
  },
  cityTextStyle: {
    color: TEXT_COLOR_SECONDARY,
    padding: 4,
    fontSize: 16
  }
})
