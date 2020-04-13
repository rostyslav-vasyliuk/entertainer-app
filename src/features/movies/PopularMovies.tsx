import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground, FlatList, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { movieGenres } from './constants';
import { Axios } from '../../api/instance';

const PopularMovies = (props) => {
  // const [moviesData, setMoviesData] = useState(null);
  const [dividedArray, setDividedArray] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Axios.get(`/movies/get-top-ten?page=${currentPage}`).then(res => {
      const moviesData = res.data.results;
      let dividedArray = [];

      for (let i = 0, j = 0; i < moviesData.length / 2; i++, j += 2) {
        dividedArray.push([moviesData[j], moviesData[j + 1]]);
      }

      // setMoviesData(moviesData);
      setDividedArray(dividedArray);
      setLoading(false);
    }
    )
  }, []);

  useEffect(() => {
    // console.log(props.endReached)
    if (props.endReached) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage)
      Axios.get(`/movies/get-top-ten?page=${currentPage}`).then(res => {
        const moviesData = res.data.results;
        let newarr = [];

        for (let i = 0, j = 0; i < moviesData.length / 2; i++, j += 2) {
          newarr.push([moviesData[j], moviesData[j + 1]]);
        }
        // console.log(newarr)
        // setMoviesData(moviesData);
        setDividedArray([...dividedArray, ...newarr]);
        setLoading(false);
        // console.log(dividedArray.length);
      })
    }
  }, [props.endReached])

  const renderMovieRow = (item) => (
    <View key={item[0].id} style={styles.twoMovieContainer}>
      <TouchableOpacity style={styles.movieContainer} onPress={() => navigate(item[0].id)}>
        <Image
          placeholderStyle={{ backgroundColor: '#3a3d42' }}
          PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
          source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item[0].backdrop_path }}
          style={styles.movieImageStyle}
        />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{item[0].title}</Text>
          <Text style={styles.movieInfo}>
            {`${getYear(item[0].release_date)}, ${getGenre(item[0].genre_ids[0])}`}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.movieContainer} onPress={() => navigate(item[1].id)}>
        <Image
          placeholderStyle={{ backgroundColor: '#3a3d42' }}
          PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
          source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item[1].backdrop_path }}
          style={styles.movieImageStyle}
        />
        <Text style={styles.movieTitle}>{item[1].title}</Text>
        <Text style={styles.movieInfo}>
          {`${getYear(item[1].release_date)}, ${getGenre(item[1].genre_ids[0])}`}
        </Text>
      </TouchableOpacity>
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

  return (
    <View>
      {loading ?
        <ActivityIndicator size="large" color="#fff" /> :
        // <ScrollView
        //   onScroll={({ nativeEvent }) => {
        //     console.log(this.isCloseToBottom(nativeEvent))
        //     if (this.isCloseToBottom(nativeEvent)) {
        //       console.log('boom')
        //     }
        //   }}
        // >
        <>
          {dividedArray.map((movieRow) => renderMovieRow(movieRow))}
        </>
        // </ScrollView>
      }
    </View>
  );
}

export default PopularMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    // color: '#fff',
  },
  trendingHeader: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center'
  },
  movieImageStyle: {
    flex: 1,
    height: 100,
    borderRadius: 15,
  },
  twoMovieContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 5,
  },
  movieContainer: {
    flex: 1,
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
    justifyContent: 'flex-start',
  }
});
