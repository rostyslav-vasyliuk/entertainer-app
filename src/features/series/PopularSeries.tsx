import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { seriesGenres } from './constants';
import { Axios } from '../../api/instance';
import { screenWidth } from '../../constants/screen-contants';

const PopularSeries = (props) => {
  const [dividedArray, setDividedArray] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Axios.get(`/tv-series/get-top-ten?page=${currentPage}`).then(res => {
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
      Axios.get(`/tv-series/get-top-ten?page=${currentPage + 1}`).then(res => {
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

  const renderMovieRow = (item) => (
    <View key={item[0].id} style={styles.twoMovieContainer}>
      <TouchableOpacity style={styles.movieContainer} onPress={() => navigate(item[0].id)}>
        <Image
          placeholderStyle={{ backgroundColor: '#3a3d42' }}
          PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
          source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item[0].poster_path }}
          style={styles.movieImageStyle}
        />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{item[0].name}</Text>
          <Text style={styles.movieInfo}>
            {`${getYear(item[0].first_air_date)}, ${getGenre(item[0].genre_ids[0])}`}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.movieContainer} onPress={() => navigate(item[1].id)}>
        <Image
          placeholderStyle={{ backgroundColor: '#3a3d42' }}
          PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
          source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item[1].poster_path }}
          style={styles.movieImageStyle}
        />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{item[1].name}</Text>
          <Text style={styles.movieInfo}>
            {`${getYear(item[1].first_air_date)}, ${getGenre(item[1].genre_ids[0])}`}
          </Text>
        </View>
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
    if (seriesGenres.find((item) => item.movieDB_id === genre_id)) {
      return seriesGenres.find((item) => item.movieDB_id === genre_id).genre;
    }
  }

  const navigate = (current_id) => {
    props.navigation.push('SeriesDetails', {
      series_id: current_id
    })
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator size='large' color='#fff' />
      ) : (
          <>
            {dividedArray.map((movieRow) => renderMovieRow(movieRow))}

            {paginationLoading && (
              <View style={styles.paginationLoaderWrapper}>
                <ActivityIndicator size='small' color='#000'/>
              </View>
            )}
          </>
        )
      }
    </View>
  );
}

export default PopularSeries;

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
    borderRadius: 15,
  },
  twoMovieContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  movieContainer: {
    width: screenWidth / 2 - 20,
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
