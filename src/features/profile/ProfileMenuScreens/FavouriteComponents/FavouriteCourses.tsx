import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Axios } from '../../../../api/instance';
import { AxiosResponse } from 'axios';
import { coursesLabels, getBiggerImage } from '../../../courses/constants';
import { screenHeight } from '../../../../constants/screen-contants';
import HeaderCustom from '../../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, LOADER_COLOR } from '../../../../constants/color-constants';
import NoResults from '../../../../ui-components/NoResults/NoResults';

const FavouriteCourses = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Axios.get(`/courses/favourite?page=${page}`).then((response: AxiosResponse) => {
      console.log(response.data.courses)
      setCourses(response.data.courses);
      setIsLoading(false);
    })
  }, []);

  const getCategory = (type: string) => {
    if (!type) {
      return '';
    }
    return coursesLabels[type];
  }

  const onEventNavigate = (course_id: string) => {
    props.navigation.push('CourseDetails', {
      course_id
    });
  }

  const goBack = () => {
    props.navigation.goBack();
  }


  const renderItem = (course) => {
    return (
      <TouchableOpacity onPress={() => onEventNavigate(course._id)}>
        <View style={styles.itemWrapper}>

          <View style={styles.itemsImageWrapper}>
            <Image source={{ uri: getBiggerImage(course.img) }} style={styles.eventPoster} />
          </View>

          <View style={styles.itemsDescriptionWrapper}>
            <View>
              <Text style={styles.itemsTitle}>
                {course.title}
              </Text>
            </View>
            <View>
              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'Duration: '}
                </Text>
                <Text style={styles.descriptionTitle}>
                  {course.duration}
                </Text>
              </View>

              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'Type: '}
                </Text>
                <Text style={styles.descriptionTitle}>
                  {getCategory(course.type)}
                </Text>
              </View>

              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'Level: '}
                </Text>
                <Text style={styles.level}>
                  {course.level || 'Mixed'}
                </Text>
              </View>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <HeaderCustom label={'Favourite Courses'} back={goBack} />
      {isLoading && (
        <View style={{ height: screenHeight - 100, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND }}>
          <ActivityIndicator color={LOADER_COLOR} />
        </View>
      )}
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={{ padding: 10 }}>
          {courses.map((event) => (
            <>
              {renderItem(event)}
            </>
          ))}
        </View>

        {courses.length === 0 && !isLoading && <NoResults />}
      </ScrollView>
    </>
  )
}

export default FavouriteCourses;
const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 150,
    // marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  itemsImageWrapper: {
    width: '40%'
  },
  itemsDescriptionWrapper: {
    width: '58%',
    paddingLeft: 15,
    flexDirection: 'column'
  },
  eventPoster: {
    width: 150,
    height: 120,
    borderRadius: 6
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: TEXT_COLOR
  },
  makeRow: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  descriptionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_COLOR
  },
  level: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_COLOR,
    textTransform: 'capitalize'
  },
})
