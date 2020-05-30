import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { coursesLabels, getBiggerImage } from './constants';
import { Axios } from '../../api/instance';
import { AxiosResponse } from 'axios';
import LottieView from 'lottie-react-native';
import { screenWidth } from '../../constants/screen-contants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import HeaderCustom from '../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR } from '../../constants/color-constants';
import NoResults from '../../ui-components/NoResults/NoResults';

const CoursesByCategories = (props) => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [pagination, setPagination]: any = useState({});
  const [allDataFetched, setAllDataFetched] = useState(false);


  useEffect(() => {
    const type = props.navigation.getParam('type', null);
    Axios.get(`/courses/list?page=${currentPage}&type=${type}`)
      .then((response: AxiosResponse) => {
        setCourses(response.data.courses);
        setPagination(response.data.pagination);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  useEffect(() => {
    if (pagination.total && (pagination.page * pagination.perPage >= pagination.total)) {
      setAllDataFetched(true);
      return;
    }

    setPaginationLoading(true);
    if (props.endReached) {
      const type = props.navigation.getParam('type', null);
      Axios.get(`/courses/list?page=${currentPage + 1}&type=${type}`).then((response: AxiosResponse) => {
        const newData = [...courses, ...response.data.courses];
        setCourses(newData);

        setPaginationLoading(false);
        setCurrentPage(currentPage + 1);
      })
    }
  }, [props.endReached])

  const goBack = () => {
    props.navigation.goBack();
  }

  const getCategory = (type: string) => {
    if (!type) {
      return '';
    }

    return coursesLabels[type];
  }

  const onCourseNavigate = (course_id: string) => {
    props.navigation.push('CourseDetails', {
      course_id
    });
  }

  if (loading) {
    return (
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  const renderItem = (course) => {
    return (
      <TouchableOpacity onPress={() => onCourseNavigate(course._id)}>
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

  const type = props.navigation.getParam('type', null);

  return (
    <>
      <HeaderCustom label={coursesLabels[type]} back={goBack} />

      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.listWrapper}>
          {courses.map((elem) => (
            <View key={elem._id}>
              {renderItem(elem)}
            </View>
          ))}

          {courses.length === 0 && !loading && <NoResults />}

          {paginationLoading && !allDataFetched && (
            <View style={styles.paginationLoaderWrapper}>
              <ActivityIndicator size='small' color='#000' />
            </View>
          )}

          {allDataFetched && (
            <View style={styles.paginationEndReached}>
              {Platform.OS === 'ios' && <LottieView
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                }}
                source={require('../../assets/lottie/empty-box.json')}
                autoPlay
                loop={true}
              />
              }
              <Text style={styles.dateText}>
                {'You\'ve reached the end!'}
              </Text>
              <Text style={styles.bottomReachedDesc}>
                {'Seems like we\'ve showed you everything we have. Change category or come back later to find something new!'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  )
}

export default CoursesByCategories;

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: 20,
    padding: 5
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: TEXT_COLOR
  },
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
  paginationLoaderWrapper: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationEndReached: {
    height: 150,
    width: screenWidth - 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 30
  },
  bottomReachedDesc: {
    fontSize: 13,
    textAlign: 'center',
    padding: 6,
    color: TEXT_COLOR
  }
})
