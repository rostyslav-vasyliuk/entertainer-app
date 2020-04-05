import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const EventTile = (props) => {
  const images = {
    cinema: require('../../assets/images/cinema.jpg'),
    concert: require('../../assets/images/concert.jpg'),
    theatre: require('../../assets/images/theatre.jpg'),
    for_child: require('../../assets/images/for_child.jpg'),
    festival: require('../../assets/images/festival.jpg'),
    stand_up: require('../../assets/images/stand_up.jpg'),
    circus: require('../../assets/images/circus.jpg'),
    seminars: require('../../assets/images/seminar.jpg'),
    exhibition: require('../../assets/images/exhibition.jpg'),
    bussiness: require('../../assets/images/bussiness.jpg'),
    quest: require('../../assets/images/quest.jpg'),
    sport: require('../../assets/images/sport.jpg'),
    poetry: require('../../assets/images/poetry.jpg'),
  }

  return (
    <TouchableOpacity activeOpacity={0.6}>
    <View style={styles.tileWrapper}>
      <ImageBackground source={images[props.type]} style={styles.image} imageStyle={{ borderRadius: 10 }}>
        <Text style={styles.label}>
          {props.label}
        </Text>
      </ImageBackground>
    </View>
    </TouchableOpacity>
  )
}

export default EventTile;

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
