import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { movieGenres } from './constants';
import { Axios } from '../../api/instance';

const PopularMovies = (props) => {
  const [dividedArray, setDividedArray] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);

  useEffect(() => {
    Axios.get(`/movies/get-top-ten?page=${currentPage}`).then(res => {
      const moviesData = res.data.results;
      let dividedArray = [];

      for (let i = 0, j = 0; i < moviesData.length / 2; i++, j += 2) {
        dividedArray.push([moviesData[j], moviesData[j + 1]]);
      }

      setDividedArray(dividedArray);
      setLoading(false);
    }
    )
  }, []);

  useEffect(() => {
    setPaginationLoading(true);
    if (props.endReached) {
      console.log(currentPage)
      Axios.get(`/movies/get-top-ten?page=${currentPage + 1}`).then(res => {
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
        <TouchableOpacity style={styles.movieContainer} onPress={() => navigate(item.id)}>
          <Image
            placeholderStyle={{ backgroundColor: '#3a3d42' }}
            PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
            source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }}
            style={styles.movieImageStyle}
            borderRadius={5}
          />
          <View style={styles.textContainer}>
            <Text style={styles.movieTitle}>
              {item.title}
            </Text>
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

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View>
      {dividedArray.map((movieRow) => renderMovieRow(movieRow))}

      {paginationLoading && (
        <View style={styles.paginationLoaderWrapper}>
          <ActivityIndicator size='small' color='#000' />
        </View>
      )}
    </View>
  );
}

export default PopularMovies;

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
    zIndex: 0
  },
  movieContainer: {
    width: 170,
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
  },
  movieTitle: {
    alignSelf: 'flex-start',
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  movieInfo: {
    color: '#000',
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
