import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { movieGenres } from '../../movies/constants';
import HeaderCustom from '../../../ui-components/Header/Header';
import { TEXT_COLOR, BACKGROUND_LIGHT, BUTTON_COLOR, BACKGROUND, TEXT_COLOR_SECONDARY } from '../../../constants/color-constants';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { screenWidth } from '../../../constants/screen-contants';
import { eventTypeArray } from '../../events/constants';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { seriesGenres } from '../../series/constants';
import { coursesTypesArray } from '../../courses/constants';
import { defaultDragData } from './preferences-data';

const BASE_SIZE = 16;
const COLOR_WHITE = '#FFFFFF';

const Preferences = (props) => {
  const order = (props.userData.order && props.userData.order.length) ? props.userData.order : defaultDragData;
  const [dragData, setDragData] = useState(order);
  const [selectedMovies, setSelectedMovies] = useState(props.userData.moviesPreferences);
  const [selectedSeries, setSelectedSeries] = useState(props.userData.seriesPreferences);
  const [selectedEvents, setSelectedEvents] = useState(props.userData.eventsPreferences);
  const [selectedCourses, setSelectedCourses] = useState(props.userData.coursesPreferences);
  const [isEditMode, setIsEditMode] = useState(false);

  const onSelectedMoviesChange = (item) => {
    setSelectedMovies(item);
  }

  const onSelectedSeriesChange = (item) => {
    setSelectedSeries(item);
  }

  const onSelectedEventsChange = (item) => {
    setSelectedEvents(item);
  }

  const onSelectedCoursesChange = (item) => {
    setSelectedCourses(item);
  }

  const setEditMode = () => {
    if (isEditMode) {
      Axios.post('/profile/set-order', { order: dragData })
        .then((response: AxiosResponse) => {
          props.setUserData(response.data);
        })
    }
    setIsEditMode(!isEditMode);
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const onConfirm = (type) => {
    const body: any = {};
    body.type = type
    if (type === 'moviesPreferences') {
      body.preferences = selectedMovies;
    }
    if (type === 'seriesPreferences') {
      body.preferences = selectedSeries;
    }
    if (type === 'coursesPreferences') {
      body.preferences = selectedCourses;
    }
    if (type === 'eventsPreferences') {
      body.preferences = selectedEvents;
    }

    Axios.post('/profile/set-preferences', body)
      .then((response: AxiosResponse) => {
        props.setUserData(response.data);
      })
      .catch(() => {

      })
  }

  const renderActiveItem = ({ item, index, drag, isActive }) => {
    const iconProps: any = {
      size: BASE_SIZE + 6,
      name: item.icon,
      color: COLOR_WHITE
    }

    let icon: JSX.Element = null;

    if (item.fontFamily === 'Ionicons') {
      icon = <Ionicons {...iconProps} />;
    } else if (item.fontFamily === 'MaterialIcons') {
      icon = <MaterialIcons {...iconProps} />;
    } else if (item.fontFamily === 'FontAwesome5') {
      icon = <FontAwesome5 {...iconProps} />;
    } else if (item.fontFamily === 'MaterialCommunityIcons') {
      icon = <MaterialCommunityIcons {...iconProps} />;
    } else if (item.fontFamily === 'FontAwesome') {
      icon = <FontAwesome {...iconProps} />;
    }

    return (
      <>
        <TouchableOpacity onPressIn={drag}>
          <View style={styles.menuButtonWrapper}>
            <View style={styles.menuIcon}>
              <Gradient
                start={[0.45, 0.45]}
                end={[0.90, 0.90]}
                colors={item.gradientColors || ['#fff']}
                style={[styles.gradient, styles.left]}
              >
                {icon}
              </Gradient>
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTextLabel}>
                {item.label}
              </Text>
            </View>
            <View style={styles.menuArrow}>
              <MaterialCommunityIcons color={'white'} size={BASE_SIZE + 6} name='drag-vertical' />
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  const renderItem = ({ item, index, drag, isActive }) => {
    const iconProps: any = {
      size: BASE_SIZE + 6,
      name: item.icon,
      color: COLOR_WHITE
    }

    let icon: JSX.Element = null;

    if (item.fontFamily === 'Ionicons') {
      icon = <Ionicons {...iconProps} />;
    } else if (item.fontFamily === 'MaterialIcons') {
      icon = <MaterialIcons {...iconProps} />;
    } else if (item.fontFamily === 'FontAwesome5') {
      icon = <FontAwesome5 {...iconProps} />;
    } else if (item.fontFamily === 'MaterialCommunityIcons') {
      icon = <MaterialCommunityIcons {...iconProps} />;
    } else if (item.fontFamily === 'FontAwesome') {
      icon = <FontAwesome {...iconProps} />;
    }

    return (
      <>
        <View style={styles.menuButtonWrapper}>
          <View style={styles.menuIcon}>
            <Gradient
              start={[0.45, 0.45]}
              end={[0.90, 0.90]}
              colors={item.gradientColors || ['#fff']}
              style={[styles.gradient, styles.left]}
            >
              {icon}
            </Gradient>
          </View>
          <View style={styles.menuText}>
            <Text style={styles.menuTextLabel}>
              {`${item.label}`}
            </Text>
          </View>
          <View style={styles.menuArrow}>

          </View>
        </View>
      </>
    )
  };

  return (
    <>
      <HeaderCustom label={'Preferences'} back={goBack} />
      <ScrollView style={{ backgroundColor: BACKGROUND }}>
        <View style={styles.wrapper}>

          <View style={styles.draggerStyle}>
            <Text style={styles.profileHeader}>
              {'Edit order'}
            </Text>

            <TouchableOpacity onPress={setEditMode}>
              <Text style={styles.btnOrder}>
                {isEditMode ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileCompleteWrapper}>
            <DraggableFlatList
              data={dragData}
              renderItem={isEditMode ? renderActiveItem : renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.key}${index}`}
              onDragEnd={({ data }) => setDragData(data)}
              scrollEnabled={false}
            />
          </View>

          <Text style={{ color: TEXT_COLOR, margin: 6, fontWeight: '600', letterSpacing: 1, fontSize: 18 }}>
            {'Personal preferences'}
          </Text>

          <View style={styles.multiWrapper}>
            <Text style={styles.profileHeader}>
              {'Preffered movie genres'}
            </Text>
            <View style={styles.profileCompleteWrapper}>
              <SectionedMultiSelect
                items={movieGenres}
                uniqueKey="movieDB_id"
                displayKey='genre'
                selectText="Choose movies genres...  "
                searchPlaceholderText={'Type here'}
                showDropDowns={true}
                colors={colors}
                styles={stylesMulti}
                onSelectedItemsChange={onSelectedMoviesChange}
                selectedItems={selectedMovies}
                onConfirm={() => onConfirm('moviesPreferences')}
              />
            </View>
          </View>

          <View style={styles.multiWrapper}>
            <Text style={styles.profileHeader}>
              {'Preffered series genres'}
            </Text>
            <View style={styles.profileCompleteWrapper}>
              <SectionedMultiSelect
                items={seriesGenres}
                uniqueKey="movieDB_id"
                displayKey='genre'
                selectText="Choose series genres...  "
                searchPlaceholderText={'Type here'}
                showDropDowns={true}
                colors={colors}
                styles={stylesMulti}
                onSelectedItemsChange={onSelectedSeriesChange}
                selectedItems={selectedSeries}
                onConfirm={() => onConfirm('seriesPreferences')}
              />
            </View>
          </View>

          <View style={styles.multiWrapper}>
            <Text style={styles.profileHeader}>
              {'Preffered event types'}
            </Text>
            <View style={styles.profileCompleteWrapper}>
              <SectionedMultiSelect
                items={eventTypeArray}
                uniqueKey="key"
                displayKey='name'
                selectText="Choose event types...  "
                searchPlaceholderText={'Type here'}
                showDropDowns={true}
                colors={colors}
                styles={stylesMulti}
                onSelectedItemsChange={onSelectedEventsChange}
                onConfirm={() => onConfirm('eventsPreferences')}
                selectedItems={selectedEvents}
              />
            </View>
          </View>

          <View style={styles.multiWrapper}>
            <Text style={styles.profileHeader}>
              {'Preffered education categories'}
            </Text>
            <View style={styles.profileCompleteWrapper}>
              <SectionedMultiSelect
                items={coursesTypesArray}
                uniqueKey="name"
                displayKey='name'
                selectText="Choose movies genres...  "
                searchPlaceholderText={'Type here'}
                showDropDowns={true}
                colors={colors}
                styles={stylesMulti}
                onSelectedItemsChange={onSelectedCoursesChange}
                selectedItems={selectedCourses}
                onConfirm={() => onConfirm('coursesPreferences')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Preferences;


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    marginBottom: 15,
    width: screenWidth,
    backgroundColor: BACKGROUND
  },
  multiWrapper: {
    backgroundColor: BACKGROUND,
    paddingTop: 20
  },
  draggerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 15
  },
  btnOrder: {
    fontSize: 15,
    color: TEXT_COLOR,
    paddingRight: 5
  },
  profileCompleteWrapper: {
    backgroundColor: BACKGROUND_LIGHT,
    width: screenWidth - 20,
    marginTop: 15,
    marginBottom: 15,
    padding: 7,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1
  },
  menuButtonWrapper: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  left: {
    marginRight: BASE_SIZE,
  },
  gradient: {
    width: BASE_SIZE * 2.5,
    height: BASE_SIZE * 2.5,
    borderRadius: BASE_SIZE * 1.2 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    paddingLeft: 5,
    width: 65
  },
  menuText: {
    width: screenWidth - 65 - 60,
    color: TEXT_COLOR
  },
  menuTextLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: TEXT_COLOR
  },
  menuArrow: {
    width: 60
  },
  profileHeader: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: TEXT_COLOR
  }
})

const colors = {
  text: TEXT_COLOR,
  subText: TEXT_COLOR,
  itemBackground: BACKGROUND_LIGHT,
  primary: BUTTON_COLOR,
  success: BUTTON_COLOR,
  searchSelectionColor: TEXT_COLOR_SECONDARY,
  chipColor: BUTTON_COLOR,
};

const stylesMulti = {
  container: {
    backgroundColor: BACKGROUND_LIGHT
  },
  selectToggle: {
    height: 50,
    alignItems: 'center',
    padding: 10
  },
  item: {
    height: 40,
  },
  selectToggleText: {
    color: TEXT_COLOR
  },
  searchBar: {},
  scrollView: {}
}
