import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { screenWidth } from '../../../constants/screen-contants';
import { TEXT_COLOR_SECONDARY, LOADER_COLOR } from '../../../constants/color-constants';

const GRID_AMOUNT = 6;

const MoviesGrid = ({ data, navigation, label }) => {

  let gridData = data.slice(0, GRID_AMOUNT);
  const navigate = (current_id) => {
    navigation.push('MovieDetails', {
      movie_id: current_id
    })
  }

  const getSmallGridItem = (element) => {
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
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() => onPressInAnimation()}
        onPressOut={() => onPressOutAnimation()}
        onPress={() => navigate(element.id)}
      >
        <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
          <View style={{ width: (screenWidth / 2) - 16, borderRadius: 6, margin: 3, height: 220 }}>
            <Image
              source={{ uri: 'https://image.tmdb.org/t/p/w500/' + element.poster_path }}
              style={{ width: (screenWidth / 2) - 16, borderRadius: 6, height: 220 }}
              PlaceholderContent={<ActivityIndicator color={LOADER_COLOR} />}
              borderRadius={6}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  const getBigGridItem = (element) => {
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
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() => onPressInAnimation()}
        onPressOut={() => onPressOutAnimation()}
        onPress={() => navigate(element.id)}
      >
        <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
          <View style={{ width: (screenWidth / 2) - 16, borderRadius: 6, margin: 3, height: 300 }}>
            <Image
              source={{ uri: 'https://image.tmdb.org/t/p/w500/' + element.poster_path }}
              style={{ width: (screenWidth / 2) - 16, borderRadius: 6, height: 300, justifyContent: 'flex-end' }}
              PlaceholderContent={<ActivityIndicator color={LOADER_COLOR} />}
              borderRadius={6}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }


  return (
    <View>
      <Text style={{ color: TEXT_COLOR_SECONDARY, paddingBottom: 6, paddingTop: 10, paddingLeft: 14, textTransform: 'uppercase', fontSize: 16, fontWeight: '600', letterSpacing: 1 }}>
        {label}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
        <View>
          {gridData.map((element, index) => {
            if (GRID_AMOUNT / 2 > index) {
              if (index === 0) {
                return getSmallGridItem(element);
              }

              return getBigGridItem(element)
            }
          })}
        </View>

        <View>
          {gridData.map((element, index) => {
            if ((GRID_AMOUNT / 2) <= index) {
              if (index === GRID_AMOUNT - 1) {
                return getSmallGridItem(element);
              }

              return getBigGridItem(element)
            }
          })}
        </View>
      </View>
    </View>
  )
}

export default MoviesGrid;
