import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { movieGenres } from './constants';
import { Axios } from '../../api/instance';
import { ScrollView } from 'react-native-gesture-handler';
import { Header, Left, Body, Right } from 'native-base';
import { screenHeight } from '../../constants/screen-contants';
import { BACKGROUND, TEXT_COLOR } from '../../constants/color-constants';
import HeaderCustom from '../../ui-components/Header/Header';

const MoviesByGenre = (props) => {
  const [dividedArray, setDividedArray] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genreID, setGenreID] = useState(null);
  const [endReached, setEndReached] = React.useState(false);


  useEffect(() => {
    const genre_id = props.navigation.getParam('genre_id', null);
    setGenreID(genre_id);
    Axios.get(`/movies/get-top-by-genre/${genre_id}?page=${currentPage}`).then(res => {
      const moviesData = res.data.results;
      let dividedArray = [];

      for (let i = 0, j = 0; i < moviesData.length / 2; i++, j += 2) {
        dividedArray.push([moviesData[j], moviesData[j + 1]]);
      }

      setDividedArray(dividedArray);
      setLoading(false);
    }
    ).catch((err) => {
      console.log(err)
    })
  }, []);

  const fetchNewPage = () => {
    setPaginationLoading(true);
    Axios.get(`/movies/get-top-by-genre/${genreID}?page=${currentPage}`).then(res => {
      const moviesData = res.data.results;
      let newarr = [];

      for (let i = 0, j = 0; i < moviesData.length / 2; i++, j += 2) {
        newarr.push([moviesData[j], moviesData[j + 1]]);
      }

      setDividedArray([...dividedArray, ...newarr]);
      setPaginationLoading(false);
      setCurrentPage(currentPage + 1);
    })
  }

  const renderMovieRow = (paired_items) => (
    <View key={paired_items[0].id} style={styles.twoMovieContainer}>
      {paired_items.map((item) => (
        <TouchableOpacity
          style={styles.movieContainer}
          onPress={() => navigate(item.id)}
          key={item.id}
        >
          <Image
            placeholderStyle={{ backgroundColor: '#3a3d42' }}
            PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
            source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }}
            style={styles.movieImageStyle}
            borderRadius={5}
          />
          <View style={styles.textContainer}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieInfo}>
              {`${getYear(item.release_date)}, ${getGenre(item.genre_ids[0])}`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return null;
    }
    return releaseDate.slice(0, 4);
  }

  const getGenre = (genre_id) => {
    if (movieGenres.find((item) => item.movieDB_id === genre_id)) {
      return movieGenres.find((item) => item.movieDB_id === genre_id).genre;
    }
  }

  const navigate = (current_id) => {
    props.navigation.push('MovieDetails', {
      movie_id: current_id
    })
  }

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
        fetchNewPage();
      }, 200)
    }
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  if (loading) {
    return (
      <View style={{ height: screenHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    )
  }
  return (
    <>
      <HeaderCustom label={getGenre(genreID)} back={goBack}/>

      <ScrollView
        onScroll={({ nativeEvent }) => onEndDetect(nativeEvent)}
        style={{ backgroundColor: BACKGROUND, paddingTop: 10 }}
      >
        <View>
          {dividedArray.map((movieRow) => renderMovieRow(movieRow))}

          {paginationLoading && (
            <View style={styles.paginationLoaderWrapper}>
              <ActivityIndicator size='small' color='#000' />
            </View>
          )}

        </View>
      </ScrollView>
    </>
  );
}

export default MoviesByGenre;

const styles = StyleSheet.create({
  movieImageStyle: {
    height: 250,
    width: 170,
    borderRadius: 5
  },
  twoMovieContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  movieContainer: {
    width: 170,
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
  },
  movieTitle: {
    alignSelf: 'flex-start',
		color: TEXT_COLOR,
    fontWeight: '700',
    fontSize: 16,
  },
  movieInfo: {
		color: TEXT_COLOR,
    fontSize: 12,
  },
  textContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
  },
  paginationLoaderWrapper: {
    minHeight: 50,
    paddingTop: 10
  }
});
