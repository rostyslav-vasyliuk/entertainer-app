import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import { monthLabel, dayConstants } from '../../constants/date-constants';
import { coursesLabels, getBiggerImage } from './constants';
import { Axios } from '../../api/instance';
import { AxiosResponse } from 'axios';
import LottieView from 'lottie-react-native';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TEXT_COLOR_SECONDARY, TEXT_COLOR, LOADER_COLOR } from '../../constants/color-constants';

const EventList = (props) => {
  const [courses, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    Axios.get(`/courses/list?page=${currentPage}`)
      .then((response: AxiosResponse) => {
        setEvents(response.data.courses);
        setPagination(response.data.pagination);
        setIsloading(false);
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
    if (allDataFetched) {
      return;
    }
    setPaginationLoading(true);
    if (props.endReached) {
      Axios.get(`/courses/list?page=${currentPage + 1}`).then((response: AxiosResponse) => {
        const newData = [...courses, ...response.data.courses];
        setEvents(newData);

        setPaginationLoading(false);
        setCurrentPage(currentPage + 1);
      })
    }
  }, [props.endReached])

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

  if (isLoading) {
    return (
      <View style={{ height: screenHeight - 300, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.listWrapper}>
      {courses.map((elem) => (
        <View key={elem._id}>
          {renderItem(elem)}
        </View>
      ))}

      {paginationLoading && !allDataFetched && (
        <View style={styles.paginationLoaderWrapper}>
          <ActivityIndicator size='small' color={LOADER_COLOR} />
        </View>
      )}

      {allDataFetched && (
        <View style={styles.paginationEndReached}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../../assets/empty-box.json')}
            autoPlay
            loop={true}
          />
          <Text style={styles.dateText}>
            {'You\'ve reached the end!'}
          </Text>
          <Text style={styles.bottomReachedDesc}>
            {'Seems like we\'ve showed you everything we have. Change category or come back later to find something new!'}
          </Text>
        </View>
      )}
    </View>
  )
}

export default EventList;

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: 30,
    padding: 5
  },
  dateDividerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 10,
    marginTop: 3
  },
  dividerWrapper: {
    marginTop: 15
  },
  dividerStyle: {
    margin: 10,
    marginBottom: 0
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: TEXT_COLOR
  },
  dateOfWeek: {
    paddingLeft: 6,
    color: TEXT_COLOR
  },
  month: {
    textTransform: 'uppercase',
    color: TEXT_COLOR_SECONDARY,
    fontWeight: '500',
    fontSize: 12
  },
  year: {
    paddingLeft: 4,
    textTransform: 'uppercase',
    color: TEXT_COLOR_SECONDARY,
    fontWeight: '500',
    fontSize: 12
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
  descriptionValue: {
    color: TEXT_COLOR
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
