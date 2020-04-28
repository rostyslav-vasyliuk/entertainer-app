import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { seriesGenres } from './constants';
import { Axios } from '../../api/instance';
import { ScrollView } from 'react-native-gesture-handler';
import { Header, Left, Body, Right } from 'native-base';
import HeaderCustom from '../../ui-components/Header/Header';
import { screenHeight } from '../../constants/screen-contants';
import { BACKGROUND, LOADER_COLOR, TEXT_COLOR } from '../../constants/color-constants';

const SeriesByGenre = (props) => {
  const [dividedArray, setDividedArray] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genreID, setGenreID] = useState(null);

  useEffect(() => {
    const genre_id = props.navigation.getParam('genre_id', null);
    setGenreID(genre_id);
    Axios.get(`/tv-series/get-top-by-genre/${genre_id}?page=${currentPage}`).then(res => {
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

  useEffect(() => {
    setPaginationLoading(true);
    if (props.endReached) {
      Axios.get(`/tv-series/get-top-by-genre/${genreID}?page=${currentPage}`).then(res => {
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
  }, [props.endReached])

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
            <Text style={styles.movieTitle}>{item.name}</Text>
            <Text style={styles.movieInfo}>
              {`${getYear(item.first_air_date)}, ${getGenre(item.genre_ids[0])}`}
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
    if (seriesGenres.find((item) => item.movieDB_id === genre_id)) {
      return seriesGenres.find((item) => item.movieDB_id === genre_id).genre;
    }
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const navigate = (current_id) => {
    props.navigation.push('SeriesDetails', {
      series_id: current_id
    })
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
      <HeaderCustom label={getGenre(genreID)} back={goBack} />

      <ScrollView style={{ backgroundColor: BACKGROUND, paddingTop: 10 }}>
        <View>
          {dividedArray.map((movieRow) => renderMovieRow(movieRow))}

          {paginationLoading && (
            <View style={styles.paginationLoaderWrapper}>
              <ActivityIndicator size='small' color={LOADER_COLOR} />
            </View>
          )}

        </View>
      </ScrollView>
    </>
  );
}

export default SeriesByGenre;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  trendingHeader: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center'
  },
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
