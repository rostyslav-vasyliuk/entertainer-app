import React, { useState, useEffect } from 'react';
import HeaderCustom from '../../../ui-components/Header/Header';
import { ScrollView, StyleSheet, View, ActivityIndicator, RefreshControl, Text, TouchableOpacity, Animated, Easing, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { BACKGROUND, LOADER_COLOR, TEXT_COLOR, BACKGROUND_LIGHT, TEXT_COLOR_SECONDARY, BUTTON_COLOR } from '../../../constants/color-constants';
import { screenHeight, BOTTOM_NAVIGATOR_HEIGHT, TOP_HEADER_HEIGHT, screenWidth } from '../../../constants/screen-contants';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { Button } from 'native-base';
import { movieGenres } from '../../movies/constants';


const MovieOfTheWeek = ({ data, navigation }) => {
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
    if (movieGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      return movieGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
    }
  }

  return (
    <View>
      <Text style={{ color: TEXT_COLOR_SECONDARY, paddingBottom: 8, paddingTop: 16, paddingLeft: '4%', textTransform: 'uppercase', fontSize: 16, fontWeight: '600', letterSpacing: 1 }}>
        {'Movie of the week'}
      </Text>

      <TouchableWithoutFeedback
        onPressIn={() => onPressInAnimation()}
        onPressOut={() => onPressOutAnimation()}
      >
        <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
          <View style={movieOfTheWeekStyles.wrapper}>
            <ImageBackground
              style={{ width: screenWidth - (screenWidth * 6) / 100, height: screenWidth - (screenWidth * 8) / 100, justifyContent: 'flex-end' }}
              source={{ uri: `https://image.tmdb.org/t/p/w1280/${data.poster_path}` }}
              imageStyle={{ borderRadius: 16 }}
            >
              <View style={{ height: 80, backgroundColor: 'rgba(35, 35, 48, 0.7)', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                <Text style={{ color: TEXT_COLOR, opacity: 1 }}>
                  {data.title}
                </Text>
                <Text style={{ color: TEXT_COLOR, opacity: 1 }}>
                  {data.release_date}
                </Text>
                <Text style={{ color: TEXT_COLOR, opacity: 1 }}>
                  {getGenre(data.genre_ids[0])}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default MovieOfTheWeek;

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
