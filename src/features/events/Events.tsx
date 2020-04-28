import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-navigation';
import EventTile from './EventTile';
import EventList from './EventList';
import { eventLabels, eventTypes } from './constants';
import { Picker } from 'native-base';
import { BACKGROUND, LOADER_COLOR } from '../../constants/color-constants';

const Events = (props: any) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [endReached, setEndReached] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false)
    }, 1000);

  }, [refreshing]);

  const RefreshController = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={LOADER_COLOR} />;

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;
  }

  const onEndDetect = (nativeEvent) => {
    if (isCloseToBottom(nativeEvent)) {
      setEndReached(true);
    }

    if (endReached) {
      setTimeout(() => {
        setEndReached(false);
      }, 200)
    }
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        refreshControl={RefreshController}
        scrollEventThrottle={100}
        onScroll={({ nativeEvent }) => onEndDetect(nativeEvent)}
      >
        <View style={styles.eventTilesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eventTypes.map((event: string) => (
              <EventTile type={event} label={eventLabels[event]} key={event} navigation={props.navigation} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.eventListWrapper}>
          <EventList
            navigation={props.navigation}
            endReached={endReached}
          />
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
    justifyContent: 'center',
    backgroundColor: BACKGROUND
  },
  eventTilesWrapper: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
  eventListWrapper: {

  }
})
