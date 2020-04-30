import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import { monthLabel, dayConstants } from '../../constants/date-constants';
import { eventLabels } from './constants';
import { Axios } from '../../api/instance';
import { AxiosResponse } from 'axios';
import LottieView from 'lottie-react-native';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import HeaderCustom from '../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../constants/color-constants';
import NoResults from '../../ui-components/NoResults/NoResults';

const EventByCategories = (props) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    const category = props.navigation.getParam('category', null);
    Axios.get(`/events/list?page=${currentPage}&category=${category}`)
      .then((response: AxiosResponse) => {
        setEvents(response.data.events);
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
      const category = props.navigation.getParam('category', null);
      Axios.get(`/events/list?page=${currentPage + 1}&category=${category}`).then((response: AxiosResponse) => {
        const newData = [...events, ...response.data.events];
        setEvents(newData);

        setPaginationLoading(false);
        setCurrentPage(currentPage + 1);
      })
    }
  }, [props.endReached])

  const getDateString = (releaseDate: string) => {
    if (!releaseDate) {
      return '';
    }
    const date = new Date(releaseDate);
    const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateString;
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const getCategory = (category: string) => {
    if (!category) {
      return '';
    }

    let finalString = eventLabels[category[0]];

    if (category.length > 1) {
      finalString += `, ${eventLabels[category[1]]}`;
    }

    return finalString;
  }

  const onEventNavigate = (event_id: string) => {
    props.navigation.push('EventDetails', {
      event_id
    });
  }


  if (loading) {
    return (
      <View style={{ height: screenHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  const renderDivider = (dateString: string) => {
    const date = new Date(dateString);

    return (
      <>
        <View style={styles.dividerWrapper}>
          <View style={styles.dateDividerStyle}>
            <Text style={styles.dateText}>
              {date.getDate()}
            </Text>
            <Text style={styles.dateOfWeek}>
              {dayConstants[date.getDay()]}
            </Text>
          </View>

          <View style={styles.dateDividerStyle}>
            <Text style={styles.month}>
              {monthLabel[date.getMonth()]}
            </Text>
            <Text style={styles.year}>
              {date.getFullYear()}
            </Text>
          </View>
        </View>

        <Divider style={styles.dividerStyle} />
      </>
    )
  }

  const renderItem = (event) => {
    return (
      <TouchableOpacity onPress={() => onEventNavigate(event._id)}>
        <View style={styles.itemWrapper}>

          <View style={styles.itemsImageWrapper}>
            <Image source={{ uri: event.img }} style={styles.eventPoster} />
          </View>

          <View style={styles.itemsDescriptionWrapper}>
            <View>
              <Text style={styles.itemsTitle}>
                {event.title}
              </Text>
            </View>
            <View>
              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'City: '}
                </Text>
                <Text style={styles.descriptionValue}>
                  {event.city}
                </Text>
              </View>

              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'Date: '}
                </Text>
                <Text style={styles.descriptionTitle}>
                  {getDateString(event.date)}
                </Text>
              </View>

              {event.price &&
                <View style={styles.makeRow}>
                  <Text style={styles.descriptionTitle}>
                    {'Price: '}
                  </Text>
                  <Text style={styles.descriptionTitle}>
                    {event.price}
                  </Text>
                </View>
              }

              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'Type: '}
                </Text>
                <Text style={styles.descriptionTitle}>
                  {getCategory(event.categories)}
                </Text>
              </View>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
  const category = props.navigation.getParam('category', null);

  return (
    <>
      <HeaderCustom label={eventLabels[category]} back={goBack} />

      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.listWrapper}>
          {events.map((elem, index) => (
            <View key={elem._id}>
              {(index === 0 || elem.date !== events[index - 1].date) && renderDivider(elem.date)}
              {renderItem(elem)}
            </View>
          ))}

          {events.length === 0 && !loading && <NoResults />}
          {paginationLoading && (
            <View style={styles.paginationLoaderWrapper}>
              <ActivityIndicator size='small' color='#000' />
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
      </ScrollView>
    </>
  )
}

export default EventByCategories;

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: 5,
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
    height: 180,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  itemsImageWrapper: {
    width: '35%'
  },
  itemsDescriptionWrapper: {
    width: '65%',
    paddingLeft: 15,
    flexDirection: 'column'
  },
  eventPoster: {
    width: '100%',
    height: '100%'
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: TEXT_COLOR
  },
  makeRow: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_COLOR
  },
  descriptionValue: {
    color: TEXT_COLOR
  },
  paginationLoaderWrapper: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: '#7a7a7a'
  }
})
