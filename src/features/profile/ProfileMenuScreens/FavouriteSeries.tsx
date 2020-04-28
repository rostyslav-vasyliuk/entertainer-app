import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Header, Body, Left, Right } from 'native-base';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { eventLabels } from '../../events/constants';
import { monthLabel, dayConstants } from '../../../constants/date-constants';
import { screenWidth, screenHeight } from '../../../constants/screen-contants';
import { Divider } from 'react-native-elements';

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
                {/* {`as ${movie.character}`} */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  )

  return (
    <>
      <Header>
        <Left />
        <Body>
          <Text>Favourite Series</Text>
        </Body>
        <Right>
        </Right>
      </Header>
      {isLoading && (
        <View style={{ height: screenHeight - 100, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={'black'} />
        </View>
      )}
      <ScrollView>
        <View style={{ padding: 10 }}>
          {!isLoading && renderSeriesCast()}
          {/* {series.map((element) => renderSeriesCast(element))} */}
          {/* {events.map((event, index) => ( */}
          <>
            {/* {(index === 0 || event.date !== events[index - 1].date) && renderDivider(event.date)}
              {renderItem(event)} */}
          </>
          {/* ))} */}
        </View>
      </ScrollView>
    </>
  )
}

export default FavouriteSeries;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030405',
    color: '#fff'
  },
  image: {
    flex: 1,
    height: 400,
    width: '100%',
    backgroundColor: '#030405'
  },
  actorsName: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 24,
    paddingBottom: 5
  },
  bigLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
    paddingBottom: 10
  },
  textLabel: {
    color: '#fff',
    fontSize: 15,
    paddingBottom: 1
  },
  blockWrapper: {
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5
  },
  carouselleItemImage: {
    width: 200,
    height: 300,
    borderRadius: 10
  },
  socialIcon: {
    fontSize: 32,
    color: 'white',
    padding: 5,
    paddingRight: 20
  },
  socialsBlock: {
    flexDirection: 'row'
  },
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
    color: '#000',
    fontWeight: '700',
    paddingBottom: 2
  },
  filmographyReleaseYear: {
    fontSize: 12,
    color: '#000',
  },
  filmographyCharacter: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#fff',
  }
});
