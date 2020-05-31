import React from 'react';
import { View, ScrollView, TouchableOpacity, ImageBackground, Text, StyleSheet, Animated, Easing } from 'react-native';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
import { seriesGenres } from '../../series/constants';
import { movieGenres } from '../../movies/constants';

const ListSeriesOfTheWeek = ({ data, navigation }) => {
  const getGenre = (genre_id) => {
    if (seriesGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      const res = seriesGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
      
      if (res) {
        return res;
      } else {
        return '';
      }
    }
    if (movieGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      return movieGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
    }
  }

  const navigate = (current_id) => {
    navigation.push('SeriesDetails', {
      series_id: current_id
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
        {'You may like these series'}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
            <Animated.View style={{ transform: [{ scale: animatedValue }] }} key={elem.id}>

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
                    {elem.name}
                  </Text>
                  <Text style={styles.info}>
                    {`${getYear(elem.first_air_date)}, ${getGenre(elem.genre_ids[0])}`}
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

export default ListSeriesOfTheWeek;


const styles = StyleSheet.create({
  title: {
    color: TEXT_COLOR, fontSize: 14, marginTop: 3, fontWeight: '500'
  },
  info: {
    color: TEXT_COLOR, fontSize: 12, marginTop: 2, fontWeight: '400'
  },
  overviewBlock: {
    // marginLeft: 15,
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
    marginLeft: 10,
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
