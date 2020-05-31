import React from 'react';
import { View, ScrollView, TouchableOpacity, ImageBackground, Text, StyleSheet, Animated, Easing } from 'react-native';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';

const ListMoviesOfTheWeek = ({ data, navigation, label }) => {
  const navigate = (current_id) => {
    navigation.push('MovieDetails', {
      movie_id: current_id
    })
  }

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  return (
    <View style={styles.overviewBlock}>
      <Text style={styles.overviewTitle}>
        {label}
      </Text>

      <ScrollView horizontal>
        {data.map((elem) => {
          const animatedValue = new Animated.Value(1);

          const onPressInAnimation = () => {
            Animated.timing(animatedValue, {
              toValue: 0.96, duration: 200, easing: Easing.ease
            }).start();
          }

          const onPressOutAnimation = () => {
            Animated.timing(animatedValue, {
              toValue: 1, duration: 200
            }).start();
          }

          return (
            <Animated.View style={{ transform: [{ scale: animatedValue }] }}>

              <TouchableOpacity
                style={styles.similarMovieContainer}
                onPress={() => navigate(elem.id)}
                onPressIn={() => onPressInAnimation()}
                onPressOut={() => onPressOutAnimation()}
                activeOpacity={0.9}
              >
                <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.poster_path }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 8 }} />
                <View>
                  <Text style={styles.title}>
                    {elem.title}
                  </Text>
                  <Text style={styles.info}>
                    {`${getYear(elem.release_date)}${elem.genres && elem.genres.length && `, ${elem.genres[0].name}`}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )
        }
        )}
      </ScrollView>
    </View>
  )
}

export default ListMoviesOfTheWeek;


const styles = StyleSheet.create({
  title: {
    color: TEXT_COLOR, fontSize: 14, marginTop: 3, fontWeight: '500'
  },
  info: {
    color: TEXT_COLOR, fontSize: 12, marginTop: 2, fontWeight: '400'
  },
  overviewBlock: {
    // paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    marginTop: 10
  },
  overviewTitle: {
    color: TEXT_COLOR_SECONDARY,
    paddingBottom: 8,
    paddingTop: 16,
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 10
  },
  movieImageStyle: {
    width: 150,
    height: 225
  },
  similarMovieContainer: {
    width: 150,
    marginLeft: 10,
  },
});
