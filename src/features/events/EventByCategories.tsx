import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import { monthLabel, dayConstants } from '../../constants/date-constants';
import { eventLabels } from './constants';
import { Axios } from '../../api/instance';
import { AxiosResponse } from 'axios';
import LottieView from 'lottie-react-native';
import { screenWidth } from '../../constants/screen-contants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Left, Button, Body, Right, Header } from 'native-base';

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
    return <ActivityIndicator size='large' color='#fff' />
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
                <Text>
                  {getDateString(event.date)}
                </Text>
              </View>

              {event.price &&
                <View style={styles.makeRow}>
                  <Text style={styles.descriptionTitle}>
                    {'Price: '}
                  </Text>
                  <Text>
                    {event.price}
                  </Text>
                </View>
              }

              <View style={styles.makeRow}>
                <Text style={styles.descriptionTitle}>
                  {'Type: '}
                </Text>
                <Text>
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
      <Header transparent>
        <Left>
          <Button transparent>
            {/* <AntDesign name='arrowleft' size={30} /> */}
          </Button>
        </Left>
        <Body>
          <Text>{eventLabels[category]}</Text>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <View style={styles.listWrapper}>
          {events.map((elem, index) => (
            <View key={elem._id}>
              {(index === 0 || elem.date !== events[index - 1].date) && renderDivider(elem.date)}
              {renderItem(elem)}
            </View>
          ))}

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
    fontWeight: '500'
  },
  dateOfWeek: {
    paddingLeft: 6,

  },
  month: {
    textTransform: 'uppercase',
    color: '#7a7a7a',
    fontWeight: '500',
    fontSize: 12
  },
  year: {
    paddingLeft: 4,
    textTransform: 'uppercase',
    color: '#7a7a7a',
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
    marginBottom: 5
  },
  makeRow: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '500'
  },
  descriptionValue: {

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
