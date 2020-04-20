import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const MovieTile = (props) => {
  const images = {
    action: require('../../assets/images/movies/action.jpg'),
    adventure: require('../../assets/images/movies/adventure.jpg'),
    animation: require('../../assets/images/movies/animation.jpg'),
    comedy: require('../../assets/images/movies/comedy.jpg'),
    crime: require('../../assets/images/movies/crime.jpg'),
    documentary: require('../../assets/images/movies/documentary.jpg'),
    drama: require('../../assets/images/movies/drama.jpg'),
    family: require('../../assets/images/movies/family.jpg'),
    fantasy: require('../../assets/images/movies/fantasy.jpg'),
    history: require('../../assets/images/movies/history.jpg'),
    horror: require('../../assets/images/movies/horror.jpg'),
    music: require('../../assets/images/movies/music.jpg'),
    mystery: require('../../assets/images/movies/mystery.jpg'),
    romance: require('../../assets/images/movies/romance.jpg'),
    science_fiction: require('../../assets/images/movies/science_fiction.jpg'),
    thriller: require('../../assets/images/movies/thriller.jpg'),
    war: require('../../assets/images/movies/war.jpg'),
    western: require('../../assets/images/movies/western.jpg')
  }

  const onGenreNavigate = (current_id) => {
    props.navigation.push('MoviesByGenre', {
      genre_id: current_id
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onGenreNavigate(props.id)}>
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
