import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-navigation';
import EventTile from './EventTile';
import EventList from './EventList';
import { eventLabels, eventTypes } from './constants';
const Events = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false)
    }, 1000);

  }, [refreshing]);

  const RefreshController = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;

  return (
    <View style={styles.wrapper}>
      <ScrollView refreshControl={RefreshController}>
        <View style={styles.eventTilesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eventTypes.map((event: string) => (
              <EventTile type={event} label={eventLabels[event]} key={event} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.eventListWrapper}>
          <EventList />
        </View>
      </ScrollView>
    </View>
  )
}

export default Events;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  eventTilesWrapper: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
  eventListWrapper: {

  }
})
