import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Header, Body, Left, Right } from 'native-base';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { eventLabels } from '../../events/constants';
import { monthLabel, dayConstants } from '../../../constants/date-constants';
import { screenWidth, screenHeight } from '../../../constants/screen-contants';
import { Divider } from 'react-native-elements';
import HeaderCustom from '../../../ui-components/Header/Header';
import { BACKGROUND, TEXT_COLOR_SECONDARY, TEXT_COLOR, LOADER_COLOR } from '../../../constants/color-constants';
import NoResults from '../../../ui-components/NoResults/NoResults';

const FavouriteEvents = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get(`/events/favourite?page=${page}`).then((response: AxiosResponse) => {
      console.log(response.data.events)
      setEvents(response.data.events);
      setIsLoading(false);
    })
  }, []);

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

  const goBack = () => {
    props.navigation.goBack();
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
                <Text style={styles.descriptionTitle}>
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

  return (
    <>
      <HeaderCustom label={'Favourite Events'} back={goBack} />
      {isLoading && (
        <View style={{ height: screenHeight - 100, alignItems: 'center', justifyContent: 'center', backgroundColor: BACKGROUND }}>
          <ActivityIndicator color={LOADER_COLOR} />
        </View>
      )}
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={{ padding: 10 }}>
          {events.map((event, index) => (
            <>
              {(index === 0 || event.date !== events[index - 1].date) && renderDivider(event.date)}
              {renderItem(event)}
            </>
          ))}
        </View>

        {events.length === 0 && !isLoading && <NoResults />}
      </ScrollView>
    </>
  )
}

export default FavouriteEvents;


const styles = StyleSheet.create({
  listWrapper: {
    // marginTop: 5,
    // padding: 5
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
    color: TEXT_COLOR,
    fontWeight: '500',
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
