import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-navigation';
import CoursesTile from './CoursesTile';
import CoursesList from './CoursesList';
import { coursesLabels, coursesTypes } from './constants';
import { BACKGROUND, LOADER_COLOR } from '../../constants/color-constants';

const Courses = (props: any) => {
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
            {coursesTypes.map((event: string) => (
              <CoursesTile type={event} label={coursesLabels[event]} key={event} navigation={props.navigation} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.eventListWrapper}>
          <CoursesList
            navigation={props.navigation}
            endReached={endReached}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Courses;

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
