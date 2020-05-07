import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Axios } from '../../../../api/instance';
import { AxiosResponse } from 'axios';
import { screenHeight } from '../../../../constants/screen-contants';
import HeaderCustom from '../../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, LOADER_COLOR } from '../../../../constants/color-constants';
import NoResults from '../../../../ui-components/NoResults/NoResults';

const FavouriteMovies = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const onMovieNavigate = (id) => {
    props.navigation.push('MovieDetails', {
      movie_id: id
    })
  }


  const getGenres = (genres) => {
    let finalString = '';
    genres.map((elem, index) => { if (index < 3) finalString += `${elem.name}, ` });
    finalString = finalString.slice(0, finalString.length - 2);
    return finalString;
  }

  const onBack = () => {
    props.navigation.goBack();
  }


  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  useEffect(() => {
    Axios.get(`/movies/favourite`).then((response: AxiosResponse) => {
      setMovies(response.data.favouriteMovies);
      setIsLoading(false);
    })
  }, []);

  const renderFilmography = () => (
    movies.map((movie) => {
      return (
        <TouchableOpacity onPress={() => onMovieNavigate(movie.id)}>
          <View style={styles.filmBlock}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` }}
              style={{ width: 130, height: 70, borderRadius: 5 }}
            />
            <View style={styles.filmographyBlock}>
              <Text style={styles.filmographyTextLabel}>
                {movie.title}
              </Text>
              <Text style={styles.filmographyReleaseYear}>
                {getYear(movie.release_date)}
              </Text>
              <Text style={styles.filmographyCharacter}>
                {getGenres(movie.genres)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  )

  return (
    <>
      <HeaderCustom label={'Favourite Movies'} back={onBack} />
      {isLoading && (
        <View style={{ height: screenHeight - 100, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND }}>
          <ActivityIndicator color={LOADER_COLOR} />
        </View>
      )}
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={{ padding: 10 }}>
          {!isLoading && renderFilmography()}
        </View>

        {movies.length === 0 && !isLoading && <NoResults />}
      </ScrollView>
    </>
  )
}

export default FavouriteMovies;


const styles = StyleSheet.create({
  filmBlock: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  filmographyBlock: {
    paddingLeft: 10,
    width: '64%'
  },
  filmographyTextLabel: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontWeight: '700',
    paddingBottom: 2
  },
  filmographyReleaseYear: {
    fontSize: 13,
    color: TEXT_COLOR,
  },
  filmographyCharacter: {
    fontSize: 12,
    paddingTop: 3,
    color: TEXT_COLOR,
  }
});
