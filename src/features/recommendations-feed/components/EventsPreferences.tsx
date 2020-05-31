import React from 'react';
import { View, ScrollView, TouchableOpacity, ImageBackground, Text, StyleSheet, Animated, Easing } from 'react-native';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
import { monthLabel } from '../../../constants/date-constants';

const EventsPreferences = ({ data, navigation }) => {
  const onCourseNavigate = (current_id) => {
    navigation.push('EventDetails', {
      event_id: current_id
    })
  }


  const getDateString = (releaseDate: string) => {
    if (!releaseDate) {
      return '';
    }
    const date = new Date(releaseDate);
    const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateString;
  }

  return (
    <View style={styles.overviewBlock}>
      <Text style={styles.overviewTitle}>
        {'Events you maybe interested in'}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((elem) => {
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

          return (
            <Animated.View style={{ transform: [{ scale: animatedValue }] }} key={elem.id}>

              <TouchableOpacity
                style={styles.similarMovieContainer}
                onPress={() => onCourseNavigate(elem._id)}
                onPressIn={() => onPressInAnimation()}
                onPressOut={() => onPressOutAnimation()}
                activeOpacity={0.9}
              >
                <ImageBackground source={{ uri: elem.img }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 8 }} />
                <View>
                    <Text style={styles.title}>
                      {elem.title}
                    </Text>
                    <Text style={styles.info}>
                      {getDateString(elem.date)}
                    </Text>
                  </View>
              </TouchableOpacity>
            </Animated.View>
          )
        }
        )}
      </ScrollView>
    </View>
  )
}

export default EventsPreferences;


const styles = StyleSheet.create({
  title: {
    color: TEXT_COLOR, fontSize: 14, marginTop: 3, fontWeight: '500'
  },
  info: {
    color: TEXT_COLOR, fontSize: 12, marginTop: 2, fontWeight: '400'
  },
  overviewBlock: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    marginTop: 10
  },
  overviewTitle: {
    color: TEXT_COLOR_SECONDARY,
    paddingBottom: 8,
    paddingTop: 16,
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1
  },
  movieImageStyle: {
    width: 150,
    height: 215
  },
  similarMovieContainer: {
    width: 150,
    marginRight: 10,
  },
});
