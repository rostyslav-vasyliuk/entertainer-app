import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const EventTile = (props) => {
  const images = {
    concerts: require('../../assets/images/concert.jpg'),
    theatres: require('../../assets/images/theatre.jpg'),
    children: require('../../assets/images/for_child.jpg'),
    festivals: require('../../assets/images/festival.jpg'),
    'stand-up': require('../../assets/images/stand_up.jpg'),
    seminars: require('../../assets/images/seminar.jpg'),
    exhibitions: require('../../assets/images/exhibition.jpg'),
    business: require('../../assets/images/bussiness.jpg'),
    quests: require('../../assets/images/quest.jpg'),
    sports: require('../../assets/images/sport.jpg'),
    poetry: require('../../assets/images/poetry.jpg'),
  }

  const onEventTypeNavigate = () => {
    props.navigation.push('EventByCategories', {
      category: props.type
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onEventTypeNavigate()}>
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
