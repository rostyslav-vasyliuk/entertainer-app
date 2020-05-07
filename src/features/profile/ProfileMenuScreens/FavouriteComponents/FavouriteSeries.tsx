import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Axios } from '../../../../api/instance';
import { AxiosResponse } from 'axios';
import { screenHeight } from '../../../../constants/screen-contants';
import { seriesGenres } from '../../../series/constants';
import HeaderCustom from '../../../../ui-components/Header/Header';
import { LOADER_COLOR, BACKGROUND, TEXT_COLOR } from '../../../../constants/color-constants';
import NoResults from '../../../../ui-components/NoResults/NoResults';

const FavouriteSeries = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);

  const onSeriesNavigate = (id) => {
    props.navigation.push('SeriesDetails', {
      series_id: id
    })
  }

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  useEffect(() => {
    Axios.get(`/tv-series/favourite`).then((response: AxiosResponse) => {
      setSeries(response.data.favouriteSeries);
      setIsLoading(false);
    })
  }, []);

  const getGenre = (genres: any[]) => {
    if (seriesGenres.find((item) => Number(item.movieDB_id) === genres[0].id)) {
      return seriesGenres.find((item) => Number(item.movieDB_id) === genres[0].id).genre;
    }
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const renderSeriesCast = () => (
    series.map((movie) => {
      return (
        <TouchableOpacity onPress={() => onSeriesNavigate(movie.id)}>
          <View style={styles.filmBlock}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` }}
              style={{ width: 130, height: 70, borderRadius: 5 }}
            />
            <View style={styles.filmographyBlock}>
              <Text style={styles.filmographyTextLabel}>
                {movie.name}
              </Text>
              <Text style={styles.filmographyReleaseYear}>
                {getYear(movie.first_air_date)}
              </Text>
              <Text style={styles.filmographyCharacter}>
                {getGenre(movie.genres)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  )

  return (
    <>
      <HeaderCustom label={'Favourite Series'} back={goBack} />
      {isLoading && (
        <View style={{ height: screenHeight - 100, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND }}>
          <ActivityIndicator color={LOADER_COLOR} />
        </View>
      )}
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={{ padding: 10 }}>
          {!isLoading && renderSeriesCast()}
        </View>

        {series.length === 0 && !isLoading && <NoResults />}
      </ScrollView>
    </>
  )
}

export default FavouriteSeries;


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
    fontSize: 12,
    color: TEXT_COLOR,
  },
  filmographyCharacter: {
    fontSize: 12,
    color: TEXT_COLOR,
  }
});
