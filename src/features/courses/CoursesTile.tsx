import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const CourseTile = (props) => {
  const images = {
    language: require('../../assets/images/courses/languages.jpg'),
    programming: require('../../assets/images/courses/programming.jpg'),
    music: require('../../assets/images/courses/music.jpg'),
    economic: require('../../assets/images/courses/economic.jpg'),
    marketing: require('../../assets/images/courses/marketing.jpg'),
  }

  const onCourseTypeNavigate = () => {
    props.navigation.push('CoursesByCategories', {
      type: props.type
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onCourseTypeNavigate()}>
      <View style={styles.tileWrapper}>
        <ImageBackground source={images[props.type]} style={styles.image} imageStyle={{ borderRadius: 10 }}>
          <Text style={styles.label}>
            {props.label}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default CourseTile;

const styles = StyleSheet.create({
  tileWrapper: {
    height: 120,
    width: 160,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5
  },
  image: {
    height: 119,
    width: 159,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 10
  },
  label: {
    color: 'white',
    textShadowColor: '#000',
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 16
  }
})
