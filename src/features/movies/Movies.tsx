import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import MovieTile from './MovieTile';
import { movieGenres } from './constants';
import PopularMovies from './PopularMovies'
import { Picker, Icon } from 'native-base';

const data = [
  "Most Relevant",
  "Most Popular"
]


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

        <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.popularMoviesLabel}>
            {'Popular Movies'}
          </Text>
          <Picker
            mode="dropdown"
            iosHeader="Sort by"
            iosIcon={<Icon name="arrow-down" style={{ marginLeft: 0, marginRight: 4, fontSize: 16 }} />}
            style={{ width: undefined }}
            textStyle={{ fontSize: 13, padding: 0 }}
            selectedValue={data[0]}
            onValueChange={() => { }}
          >
            {data.map((item) => (
              <Picker.Item label={item} value={item} />
            ))}
          </Picker>
        </View>

        <PopularMovies
          navigation={props.navigation}
          endReached={endReached}
        // style={{ zIndex: 0 }}
        />

      </ScrollView>
    </View >
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
    // textAlign: 'center',
    fontSize: 16,
    paddingBottom: 15,
    fontWeight: '600',
    letterSpacing: 1.1
  },
  movieTilesWrapper: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
  movieListWrapper: {

  }
})
