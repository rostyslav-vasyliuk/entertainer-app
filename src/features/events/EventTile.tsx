import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const EventTile = (props) => {
  const images = {
    concerts: require('../../assets/images/events/concert.jpg'),
    theatres: require('../../assets/images/events/theatre.jpg'),
    children: require('../../assets/images/events/for_child.jpg'),
    festivals: require('../../assets/images/events/festival.jpg'),
    'stand-up': require('../../assets/images/events/stand_up.jpg'),
    seminars: require('../../assets/images/events/seminar.jpg'),
    exhibitions: require('../../assets/images/events/exhibition.jpg'),
    business: require('../../assets/images/events/bussiness.jpg'),
    quests: require('../../assets/images/events/quest.jpg'),
    sports: require('../../assets/images/events/sport.jpg'),
    poetry: require('../../assets/images/events/poetry.jpg'),
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
