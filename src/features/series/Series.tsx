import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import SeriesTile from './SeriesTile';
import { seriesGenres } from './constants';
import PopularSeries from './PopularSeries';
// import PopularMovies from './PopularMovies'

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
      >
        <View style={styles.movieTilesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {seriesGenres.map((movie: any) => (
              <SeriesTile label={movie.genre} image={movie.genre_key} key={movie.movieDB_id} />
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
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 15
  },
  movieTilesWrapper: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
  movieListWrapper: {

  }
})
