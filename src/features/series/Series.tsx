import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import SeriesTile from './SeriesTile';
import { seriesGenres } from './constants';
import PopularSeries from './PopularSeries';
import { BACKGROUND, TEXT_COLOR } from '../../constants/color-constants';

const Series = (props: any) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [endReached, setEndReached] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false)
    }, 1000);

  }, [refreshing]);

  const RefreshController = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;
  }

  const onEndDetect = (nativeEvent) => {
    if (isCloseToBottom(nativeEvent)) {
      setEndReached(true);
    }

    if (endReached) {
      setTimeout(() => {
        setEndReached(false);
      }, 200)
    }
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        refreshControl={RefreshController}
        scrollEventThrottle={100}
        onScroll={({ nativeEvent }) => onEndDetect(nativeEvent)}
        style={{backgroundColor: BACKGROUND}}
      >
        <View style={styles.movieTilesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {seriesGenres.map((movie: any) => (
              <SeriesTile
                label={movie.genre}
                image={movie.genre_key}
                id={movie.movieDB_id}
                key={movie.movieDB_id}
                navigation={props.navigation}
              />
            ))}
          </ScrollView>
        </View>

        <Text style={styles.popularMoviesLabel}>
          Popular Series
        </Text>

        <PopularSeries
          navigation={props.navigation}
          endReached={endReached}
        />

      </ScrollView>
    </View>
  );
}

export default Series;


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  popularMoviesLabel: {
    paddingTop: 15,
    fontSize: 16,
    paddingLeft: 12,
    paddingBottom: 10,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: TEXT_COLOR
  },
  movieTilesWrapper: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
})
