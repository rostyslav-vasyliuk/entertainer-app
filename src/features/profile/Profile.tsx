import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { Shapes } from 'react-native-background-shapes';
import { Card } from 'native-base';
import * as Progress from 'react-native-progress';
import { screenWidth } from '../../constants/screen-contants';

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

  return (
    <ScrollView>
      <View style={styles.wrapper}>

        <Avatar
          rounded
          size='xlarge'
          icon={{ name: 'user', type: 'font-awesome' }}
          source={{ uri: 'https://pmcvariety.files.wordpress.com/2020/03/kylie-jenner.jpg?w=1000' }}
        />

        <Text style={styles.textStyle}>
          {`Name Surname`}
        </Text>

        <Text style={styles.descriptionText}>
          {`@nickname_here`}
        </Text>

        <View style={styles.profileCompleteWrapper}>
          <Text style={styles.profileCompleteHeader}>
            {'Complete your profile'}
          </Text>
          <Divider />
          <View style={styles.progressbarWrapper}>
            <Progress.Bar progress={0.9} color={percent2color(43)} height={10} width={screenWidth - 50} />
          </View>
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
    margin: 50,
    marginTop: 15,
    padding: 7,
    borderRadius: 3,
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
  }
})
