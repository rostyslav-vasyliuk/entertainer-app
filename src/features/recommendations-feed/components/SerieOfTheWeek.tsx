import React from 'react';
import { StyleSheet, View, Text, Animated, Easing, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { TEXT_COLOR, BACKGROUND_LIGHT, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
import { screenWidth } from '../../../constants/screen-contants';
import { seriesGenres } from '../../series/constants';
import { movieGenres } from '../../movies/constants';


const SerieOfTheWeek = ({ data, navigation }) => {
  const navigate = (current_id) => {
    navigation.push('SeriesDetails', {
      series_id: current_id
    })
  }

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

  const getGenre = (genre_id) => {
    if (seriesGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      return seriesGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
    }

    if (movieGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      return movieGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
    }
  }

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  return (
    <View>
      <Text style={{ color: TEXT_COLOR_SECONDARY, paddingBottom: 8, paddingTop: 10, paddingLeft: '4%', textTransform: 'uppercase', fontSize: 16, fontWeight: '600', letterSpacing: 1 }}>
        {'Series of the week'}
      </Text>

      <TouchableWithoutFeedback
        onPressIn={() => onPressInAnimation()}
        onPressOut={() => onPressOutAnimation()}
        onPress={() => navigate(data.id)}
      >
        <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
          <View style={movieOfTheWeekStyles.wrapper}>
            <ImageBackground
              style={{ width: screenWidth - (screenWidth * 6) / 100, height: screenWidth - (screenWidth * 8) / 100, justifyContent: 'flex-end' }}
              source={{ uri: `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}` }}
              imageStyle={{ borderRadius: 16 }}
            >
              {/* <View style={{ height: 80, backgroundColor: 'rgba(35, 35, 48, 0.7)', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: 'flex-end', paddingRight: 10, justifyContent: 'center' }}>
                <Text style={{ color: TEXT_COLOR, opacity: 1, fontWeight: '600', fontSize: 20, letterSpacing: 1 }}>
                  {data.name}
                </Text>
                <Text style={{ color: TEXT_COLOR, opacity: 1, fontSize: 13, paddingTop: 1 }}>
                  {getYear(data.first_air_date)}
                </Text>
                <Text style={{ color: TEXT_COLOR, opacity: 1, fontSize: 14, paddingTop: 1 }}>
                  {getGenre(data.genre_ids[0])}
                </Text>
              </View> */}
            </ImageBackground>
          </View>
          <View style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: 'flex-end', paddingRight: 10, justifyContent: 'center' }}>
            <Text style={{ color: TEXT_COLOR, opacity: 1, fontWeight: '600', fontSize: 20, letterSpacing: 1 }}>
              {data.name}
            </Text>
            <Text style={{ color: TEXT_COLOR, opacity: 1, fontSize: 13, paddingTop: 1 }}>
              {`${getYear(data.first_air_date)}, ${getGenre(data.genre_ids[0])}`}
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default SerieOfTheWeek;

const movieOfTheWeekStyles = StyleSheet.create({
  wrapper: {
    // marginTop: 10,
    borderRadius: 16,
    width: '94%',
    backgroundColor: BACKGROUND_LIGHT,
    marginLeft: '3%',
    marginRight: '3%'
  }
})
