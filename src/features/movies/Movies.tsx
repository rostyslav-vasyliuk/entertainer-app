import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import MovieTile from './MovieTile';
import { movieGenres } from './constants';
import PopularMovies from './PopularMovies'

const Movies = (props: any) => {
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
            {movieGenres.map((movie: any) => (
              <MovieTile
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
          Popular Movies
        </Text>

        <PopularMovies
          navigation={props.navigation}
          endReached={endReached}
        />

      </ScrollView>
    </View>
  );
}

export default Movies;


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
