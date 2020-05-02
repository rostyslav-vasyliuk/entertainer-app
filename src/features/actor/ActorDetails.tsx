import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { Axios } from '../../api/instance';
import { AxiosResponse } from 'axios';
import { monthLabel } from '../../constants/date-constants';
import { Divider } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import { FontAwesome } from '@expo/vector-icons';
import { BACKGROUND, HEADER_BACKGROUND, TEXT_COLOR_SECONDARY, LOADER_COLOR } from '../../constants/color-constants';
import { Entypo } from '@expo/vector-icons'

const ActorDetails = (props) => {
  const [actorsData, setActorsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const actor_id = props.navigation.getParam('actor_id', null);
    Axios.get(`/actor/details/${actor_id}`).then((response: AxiosResponse) => {
      setActorsData(response.data);
      setLoading(false);
    });
  }, []);

  const getGender = (gender: number) => {
    return gender ? 'Male' : 'Female';
  }

  const getDateString = (releaseDate: string) => {
    if (!releaseDate) {
      return '';
    }
    const date = new Date(releaseDate);
    const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateString;
  }

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  const onMovieNavigate = (id) => {
    props.navigation.push('MovieDetails', {
      movie_id: id
    })
  }

  const onSeriesNavigate = (id) => {
    props.navigation.push('SeriesDetails', {
      series_id: id
    })
  }

  const renderFilmography = () => (
    actorsData.credits.cast.map((movie) => {
      return (
        <TouchableOpacity onPress={() => onMovieNavigate(movie.id)}>
          <View style={styles.filmBlock}>
            {movie.backdrop_path ?
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` }}
                style={{ width: 130, height: 70, borderRadius: 5 }}
                placeholderStyle={{ backgroundColor: BACKGROUND }}
                PlaceholderContent={<ActivityIndicator size='small' color={LOADER_COLOR} />}
              />
              : (
                <View style={{ width: 130, height: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: HEADER_BACKGROUND }}>
                  <Entypo name='image' style={{ color: TEXT_COLOR_SECONDARY, fontSize: 30 }} />
                </View>
              )
            }
            <View style={styles.filmographyBlock}>
              <Text style={styles.filmographyTextLabel}>
                {movie.title}
              </Text>
              <Text style={styles.filmographyReleaseYear}>
                {getYear(movie.release_date)}
              </Text>
              <Text style={styles.filmographyCharacter}>
                {`as ${movie.character}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  )

  const renderSeriesCast = () => (
    actorsData.tv_credits.cast.map((movie) => {
      return (
        <TouchableOpacity onPress={() => onSeriesNavigate(movie.id)}>
          <View style={styles.filmBlock}>
            {movie.backdrop_path ?
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` }}
                style={{ width: 130, height: 70, borderRadius: 5 }}
                placeholderStyle={{ backgroundColor: BACKGROUND }}
                PlaceholderContent={<ActivityIndicator size='small' color={LOADER_COLOR} />}
              />
              : (
                <View style={{ width: 130, height: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: HEADER_BACKGROUND }}>
                  <Entypo name='image' style={{ color: TEXT_COLOR_SECONDARY, fontSize: 30 }} />
                </View>
              )
            }
            <View style={styles.filmographyBlock}>
              <Text style={styles.filmographyTextLabel}>
                {movie.name}
              </Text>
              <Text style={styles.filmographyReleaseYear}>
                {getYear(movie.first_air_date)}
              </Text>
              <Text style={styles.filmographyCharacter}>
                {`as ${movie.character}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  )

  const renderCarouselItem = ({ item }) => {
    return (
      <View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w1280/${item.file_path}` }} style={styles.carouselleItemImage} />
      </View>
    )
  }

  const renderSocialBlock = () => {
    const external_ids = actorsData.external_ids;
    if (external_ids.instagram_id || external_ids.twitter_id || external_ids.facebook_id) {
      return (
        <View style={styles.socialsBlock}>
          {external_ids.instagram_id && (
            <TouchableOpacity>
              <FontAwesome name='instagram' style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {external_ids.facebook_id && (
            <TouchableOpacity>
              <FontAwesome name='facebook' style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {external_ids.twitter_id && (
            <TouchableOpacity>
              <FontAwesome name='twitter' style={styles.socialIcon} />
            </TouchableOpacity>
          )}
        </View>
      )
    }

    return;
  }

  if (loading) {
    return (
      <View style={{ height: screenHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w1280/${actorsData.profile_path}` }}
        style={styles.image}
      />
      <View style={styles.blockWrapper}>
        <Text style={styles.actorsName}>
          {actorsData.name}
        </Text>
        <Text style={styles.textLabel}>
          {`Born: ${getDateString(actorsData.birthday)}`}
        </Text>
        <Text style={styles.textLabel}>
          {getGender(actorsData.gender)}
        </Text>
        <Text style={styles.textLabel}>
          {actorsData.place_of_birth}
        </Text>
        {renderSocialBlock()}
      </View>

      <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

      <View style={styles.blockWrapper}>
        <Text style={styles.bigLabel}>
          {'Biography'}
        </Text>
        <Text style={styles.textLabel}>
          {actorsData.biography}
        </Text>
      </View>

      <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

      <View style={styles.blockWrapper}>
        <Text style={styles.bigLabel}>
          {'Films'}
        </Text>
        <View>
          {renderFilmography()}
        </View>
      </View>

      <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

      <View style={styles.blockWrapper}>
        <Text style={styles.bigLabel}>
          {'Series'}
        </Text>
        <View>
          {renderSeriesCast()}
        </View>
      </View>

      <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

      <View style={styles.blockWrapper}>
        <Text style={styles.bigLabel}>
          {'Photos'}
        </Text>
        <Carousel
          data={actorsData.images.profiles}
          sliderWidth={screenWidth}
          itemWidth={220}
          hasParallaxImages={true}
          renderItem={renderCarouselItem}
          inactiveSlideScale={0.}
          inactiveSlideOpacity={0.7}
          onSnapToItem={(index) => setActiveSlide(index)}
          loop={true}
        />
        <Pagination
          dotsLength={actorsData.images.profiles.length}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'white'
          }}
          inactiveDotStyle={{
            backgroundColor: 'white'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </ScrollView>
  );
}

export default ActorDetails;

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
    borderRadius: 8
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
    color: '#fff',
    fontWeight: '700',
    paddingBottom: 2
  },
  filmographyReleaseYear: {
    fontSize: 12,
    color: '#fff',
  },
  filmographyCharacter: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#fff',
  }
});
