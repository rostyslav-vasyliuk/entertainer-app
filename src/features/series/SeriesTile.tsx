import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const MovieTile = (props) => {
  const images = {
    action: require('../../assets/images/series/action.jpg'),
    animation: require('../../assets/images/series/animation.jpg'),
    comedy: require('../../assets/images/series/comedy.jpg'),
    crime: require('../../assets/images/series/crime.jpg'),
    documentary: require('../../assets/images/series/documentary.jpg'),
    drama: require('../../assets/images/series/drama.jpg'),
    family: require('../../assets/images/series/family.jpg'),
    kids: require('../../assets/images/series/kids.jpg'),
    mystery: require('../../assets/images/series/mystery.jpg'),
    science_fiction: require('../../assets/images/series/science_fiction.jpg'),
    soap: require('../../assets/images/series/soap.jpg'),
    talk: require('../../assets/images/series/talk.jpg'),
    war: require('../../assets/images/series/war.jpg'),
    western: require('../../assets/images/series/western.jpg')
  }

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View style={styles.tileWrapper}>
        <ImageBackground source={images[props.image]} style={styles.image} imageStyle={{ borderRadius: 10 }}>
          <Text style={styles.label}>
            {props.label}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default MovieTile;

const styles = StyleSheet.create({
  tileWrapper: {
    height: 120,
    width: 160,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5
  },
  image: {
    height: 119,
    width: 159,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 10
  },
  label: {
    color: 'white',
    textShadowColor: '#000',
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 16
  }
})
