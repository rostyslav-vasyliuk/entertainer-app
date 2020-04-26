import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { screenWidth } from '../../constants/screen-contants';
import AvatarComponent from './AvatarComponent';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BASE_SIZE = 16;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = '#FFFFFF';
const COLOR_GREY = '#9FA5AA';
const gradientColors = true ? GRADIENT_BLUE : GRADIENT_PINK;

const Profile = (props) => {
  const percent2color = (perc) => {
    let r, g, b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    }
    else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  const renderMenuButton = () => {
    return (
      <>
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.menuButtonWrapper}>
            <View style={styles.menuIcon}>
              <Gradient
                start={[0.45, 0.45]}
                end={[0.90, 0.90]}
                colors={gradientColors}
                style={[styles.gradient, styles.left]}
              >
                <Ionicons
                  size={BASE_SIZE + 10}
                  name={'md-happy'}
                  color={COLOR_WHITE}
                />
              </Gradient>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTextLabel}>
                {'Preferences'}
              </Text>
              <Text style={styles.menuTextDesc}>
                {'Control your preferences and orders of categories'}
              </Text>
            </View>
            <View style={styles.menuArrow}>
              <MaterialIcons name='chevron-right' size={BASE_SIZE * 1.5} />
            </View>
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    )
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {/* 
        <Avatar
          rounded
          size='xlarge'
          icon={{ name: 'user', type: 'font-awesome' }}
          source={{ uri: 'https://pmcvariety.files.wordpress.com/2020/03/kylie-jenner.jpg?w=1000' }}
        /> */}

        <AvatarComponent user={{}} />
        <Text style={styles.textStyle}>
          {`Name Surname`}
        </Text>

        {/* <Text style={styles.descriptionText}>
          {`@nickname_here`}
        </Text> */}

        {/* <View style={styles.profileCompleteWrapper}>
          <Text style={styles.profileCompleteHeader}>
            {'Complete your profile'}
          </Text>
          <Divider />
          <View style={styles.progressbarWrapper}>
            <Progress.Bar progress={0.9} color={percent2color(43)} height={10} width={screenWidth - 50} />
          </View>
        </View> */}
        <Text style={styles.profileHeader}>
          {'Favourites'}
        </Text>
        <View style={styles.profileCompleteWrapper}>
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}
        </View>

        <Text style={styles.profileHeader}>
          {'Account'}
        </Text>
        <View style={styles.profileCompleteWrapper}>
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}
          {renderMenuButton()}

        </View>
      </View>
    </ScrollView>
  )
}

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15
  },
  textStyle: {
    fontSize: 24,
    color: '#000',
    marginTop: 15,
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 5,
    color: 'gray'
  },
  profileCompleteWrapper: {
    backgroundColor: '#fafafa',
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
    height: 70,
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
    fontWeight: '600'
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
  }
})
