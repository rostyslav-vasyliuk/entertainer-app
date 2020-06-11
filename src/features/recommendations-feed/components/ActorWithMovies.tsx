import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY, LIGHT_IMAGE_PLACEHOLDER } from '../../../constants/color-constants';
import { Entypo } from '@expo/vector-icons';
import { movieGenres } from '../../movies/constants';
import { getDateString, getAge } from '../../../constants/date-constants';

const ActorWithMovies = ({ data, navigation }) => {

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  const navigate = (current_id) => {
    navigation.push('MovieDetails', {
      movie_id: current_id
    })
  }

  const getGenre = (genre_id) => {
    if (movieGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      return movieGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
    }
  }

  return (
    <View>

      <Text style={{ color: TEXT_COLOR_SECONDARY, paddingBottom: 6, paddingTop: 10, paddingLeft: '4%', textTransform: 'uppercase', fontSize: 16, fontWeight: '600', letterSpacing: 1 }}>
        {'Actor you may like'}
      </Text>

      <View style={actorMoviesStyles.wrapper}>
        <View style={{ flexDirection: 'row', paddingBottom: 12, padding: 10 }}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w1280/${data.actor.profile_path}` }}
            style={{ width: 100, height: 140, borderRadius: 16 }}
          />
          <View style={{ padding: 12, paddingTop: 2, paddingBottom: 2, justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: TEXT_COLOR, paddingTop: 3, paddingBottom: 4, fontWeight: '600', fontSize: 16, letterSpacing: 1.1 }}>
                {data.actor.name}
              </Text>

              <Text style={{ color: TEXT_COLOR, paddingTop: 3, fontWeight: '400', fontSize: 12, overflow: 'hidden', width: '90%' }}>
                {data.actor.place_of_birth}
              </Text>

              <Text style={{ color: TEXT_COLOR, paddingTop: 3, fontWeight: '400', fontSize: 12, overflow: 'hidden' }}>
                {`Born: ${getDateString(data.actor.birthday)} (${getAge(data.actor.birthday)} y.o.)`}
              </Text>

              <Text style={{ color: TEXT_COLOR, paddingTop: 3, fontWeight: '400', fontSize: 12, overflow: 'hidden' }}>
                {`Movies: ${data.actor.credits.cast.length}`}
              </Text>
            </View>

            {/* <TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                <Text style={{ color: TEXT_COLOR_SECONDARY, fontSize: 12, fontWeight: '600', letterSpacing: 0.9 }}>
                  {'Know more'}
                </Text>

                <Entypo name='chevron-small-right' />
              </View>
            </TouchableOpacity> */}
          </View>
        </View>

        <Text style={{ color: TEXT_COLOR, fontSize: 14, marginLeft: 10, fontWeight: '600', letterSpacing: 0.9 }}>
          {'Best known for:'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.data.map((element, index) => {
            const animatedValue = new Animated.Value(1);
            const onPressInAnimation = () => {
              Animated.timing(animatedValue, {
                toValue: 0.96, duration: 200, easing: Easing.ease
              }).start();
            }

            const onPressOutAnimation = () => {
              Animated.timing(animatedValue, {
                toValue: 1, duration: 200
              }).start();
            }

            if (index < 10) {
              return (
                <TouchableWithoutFeedback
                  onPressIn={() => onPressInAnimation()}
                  onPressOut={() => onPressOutAnimation()}
                  onPress={() => navigate(element.id)}
                  key={`${index} ${element.id}`}
                >
                  <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
                    <View style={{ minHeight: 180, width: 120, marginLeft: 8, marginRight: 4, marginTop: 5, borderRadius: 8, marginBottom: 6 }}>
                      {element.backdrop_path ? (
                        <Image
                          source={{ uri: `https://image.tmdb.org/t/p/w1280/${element.backdrop_path}` }}
                          style={{ height: 150, width: 120, borderRadius: 8 }}
                        />
                      ) : (
                          <View style={{ height: 150, width: 120, borderRadius: 8, backgroundColor: LIGHT_IMAGE_PLACEHOLDER, justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo name='image' style={{ color: TEXT_COLOR_SECONDARY, fontSize: 36 }} />
                          </View>
                        )
                      }

                      <Text style={{ color: TEXT_COLOR, fontSize: 12, marginTop: 3, fontWeight: '400' }}>
                        {element.title}
                      </Text>

                      <Text style={{ color: TEXT_COLOR, fontSize: 11, marginTop: 3, fontWeight: '300' }}>
                        {`${getYear(element.release_date)}, ${getGenre(element.genre_ids[0])}`}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              )
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default ActorWithMovies;

const actorMoviesStyles = StyleSheet.create({
  wrapper: {
    // padding: 8,
    // paddingRight: 2,
    borderRadius: 16,
    width: '94%',
    backgroundColor: '#181821',
    marginLeft: '3%',
    marginRight: '3%'
  }
});
