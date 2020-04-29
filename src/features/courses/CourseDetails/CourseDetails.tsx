import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Image, Text, View, StatusBar, ImageBackground, Linking } from 'react-native';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { coursesLabels, getBiggerImage, getBiggerImageInstructor } from '../constants';
import { screenWidth } from '../../../constants/screen-contants';
import { Button, Toast } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { TEXT_COLOR } from '../../../constants/color-constants';

const CourseDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData]: any = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isFavourite, setIsFavourite] = useState(null);

  useEffect(() => {
    const course_id = props.navigation.getParam('course_id', null);
    Axios.get(`/courses/details/${course_id}`).then((response: AxiosResponse) => {
      setCourseData(response.data.course);
      setRecommendations(response.data.recommendations);
      setIsFavourite(response.data.isFavourite)
      setIsLoading(false);
    });
  }, []);

  const getCategoriesString = (type: string) => {
    return coursesLabels[type];
  }

  const onCourseNavigate = (course_id: string) => {
    props.navigation.push('CourseDetails', { course_id });
  }

  const addToFavourites = () => {
    Axios.post('/courses/favourite', { id: courseData._id }).then((response: AxiosResponse) => {
      setIsFavourite(response.data.isFavourite);
      if (response.data.isFavourite) {
        Toast.show({
          text: 'Added to favourites'
        })
      } else {
        Toast.show({
          text: 'Removed from favourites'
        })
      }
    }).catch(() => {

    })
    console.log(courseData._id);
  }

  const onLinkOpen = (url: string) => {
    Linking.openURL(url);
  }

  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator />
      </View>
    )
  }
  console.log(courseData)
  return (
    <>
      <StatusBar barStyle='light-content' />
      <ScrollView style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: getBiggerImage(courseData.img) }}
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>
          {courseData.title}
        </Text>

        <View style={styles.infoMovieMain}>
          <View>
            <Text style={styles.country}>
              {'Category: ' + getCategoriesString(courseData.type)}
            </Text>

            <Text style={styles.country}>
              {'Level: ' + (courseData.level || 'Mixed')}
            </Text>

            <Text style={styles.country}>
              {'Duration: ' + courseData.duration}
            </Text>

            <Text style={styles.country}>
              {'Rating: ' + courseData.rating + '/5.0'}
            </Text>

          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => addToFavourites()}>
              {isFavourite ?
                <AntDesign name={'star'} size={30} color={'#1ecaff'} />
                :
                <AntDesign name={'staro'} size={30} color={'#1ecaff'} />
              }
            </TouchableOpacity>
          </View>
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />


        <View style={styles.overviewBlock}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
            <Text style={styles.overviewTitle}>Overview</Text>
          </View>
          <Text style={styles.duration}>{courseData.description}</Text>
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
            <Text style={styles.overviewTitle}>Instructor</Text>
          </View>
          <View style={styles.instructorBlock}>

            <Image
              source={{ uri: getBiggerImageInstructor(courseData['instructor-avatar']) }}
              style={{ width: 240, height: 240, borderRadius: 8 }}
            />
          <Text style={styles.instructorName}>{courseData['instructor-name']}</Text>
          <Text style={styles.instructorName2}>{courseData['instructor-title']}</Text>


          </View>
          {/* <Text style={styles.duration}>{courseData.description}</Text> */}
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <Button full style={styles.button} onPress={() => onLinkOpen(courseData.link)}>
          <Text style={{ color: '#fff' }}>
            {'Visit page'}
          </Text>
        </Button>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>Recommendations</Text>
          <ScrollView horizontal>
            {recommendations.map((elem) =>
              <View key={elem.id}>
                <TouchableOpacity style={styles.similarMovieContainer} onPress={() => onCourseNavigate(elem._id)}>
                  <ImageBackground source={{ uri: getBiggerImage(elem.img) }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 4 }} />
                  <View>
                    <Text style={styles.country}>
                      {elem.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

export default CourseDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030405',
    color: '#fff'
  },
  imageWrapper: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#030405',
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 370,
    borderRadius: 2,
    backgroundColor: '#030405'
  },
  instructorName: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10
  },
  instructorName2: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
  country: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    paddingTop: 6
  },
  level: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    paddingTop: 6,
    textTransform: 'capitalize'
  },
  duration: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 8
  },
  date: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 4
  },
  infoMovieMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
  },
  overviewBlock: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  instructorBlock: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 5,
  },
  movieImageStyle: {
    width: 180,
    height: 180
  },
  similarMovieContainer: {
    width: 180,
    marginRight: 10,
    paddingBottom: 15,
    paddingTop: 15
  },
  button: {
    marginBottom: 5,
    height: 50,
    marginTop: 15,
    width: screenWidth - 26,
    borderRadius: 5,
    backgroundColor: '#fe4b66',
    marginLeft: 13
  },
  iconWrapper: {
    paddingRight: 10
  }
})
