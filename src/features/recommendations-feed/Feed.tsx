import React, { useState, useEffect } from 'react';
import HeaderCustom from '../../ui-components/Header/Header';
import { ScrollView, StyleSheet, View, ActivityIndicator, RefreshControl, Text, Animated, Image, TouchableOpacity } from 'react-native';
import { BACKGROUND, LOADER_COLOR, TEXT_COLOR, BACKGROUND_LIGHT, TEXT_COLOR_SECONDARY, BUTTON_COLOR, LIGHT_IMAGE_PLACEHOLDER } from '../../constants/color-constants';
import { screenHeight, BOTTOM_NAVIGATOR_HEIGHT, TOP_HEADER_HEIGHT } from '../../constants/screen-contants';
import { Axios } from '../../api/instance';
import { AxiosResponse } from 'axios';
import { Button } from 'native-base';
import MovieOfTheWeek from './components/MovieOfTheWeekComponent';
import ActorWithMovies from './components/ActorWithMovies';
import ListMoviesOfTheWeek from './components/ListMoviesOfTheWeek';
import SerieOfTheWeek from './components/SerieOfTheWeek';
import ListSeriesOfTheWeek from './components/ListSeriesOfTheWeek';

const RecommendationsFeed = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const [endReached, setEndReached] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false)
    }, 1000);

  }, [refreshing]);

  useEffect(() => {
    Axios.get('/recommendations/list').then((response: AxiosResponse) => {
      setIsLoading(false);
      setResponseData(response.data.result);
      // console.log(response);
    })
  }, []);

  const click = () => {
    Axios.get('/recommendations/list').then((response: AxiosResponse) => {
      setIsLoading(false);
      setResponseData(response.data.result);
    })
  }

  const renderReccomendedItem = (data, index) => {
    if (data.type === 'actor_movies') {
      return <ActorWithMovies data={data} navigation={props.navigation} />;
    }

    if (data.type === 'movie_of_the_week') {
      return <MovieOfTheWeek data={data.data} navigation={props.navigation} />
    }

    if (data.type === 'movies_of_the_week') {
      return <ListMoviesOfTheWeek data={data.data} navigation={props.navigation} />
    }

    if (data.type === 'serie_of_the_week') {
      return <SerieOfTheWeek data={data.data} navigation={props.navigation} />
    }

    if (data.type === 'series_of_the_week') {
      return <ListSeriesOfTheWeek data={data.data} navigation={props.navigation} />
    }
  }

  const RefreshController = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={LOADER_COLOR} />;

  return (
    <>
      <HeaderCustom label={'Home'} />

      {isLoading && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={LOADER_COLOR} />
        </View>
      )}

      <Button onPress={() => click()} />
      {!isLoading && (
        <ScrollView style={styles.scrollView} refreshControl={RefreshController}>
          {responseData.map(renderReccomendedItem)}
        </ScrollView>
      )}
    </>
  )
}

export default RecommendationsFeed;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: BACKGROUND
  },
  loaderStyle: {
    height: screenHeight - BOTTOM_NAVIGATOR_HEIGHT - TOP_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND
  }
});
