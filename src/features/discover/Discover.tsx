import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, CheckBox } from 'native-base';
import TabHeaderLabel from '../../ui-components/tab-header/TabHeader';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import Events from '../events/Events';
import Movies from '../movies/Movies';
import Series from '../series/Series';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY, HEADER_BACKGROUND, BUTTON_COLOR } from '../../constants/color-constants';
import Courses from '../courses/Courses';
import { categoryLabels, defaultCategories } from './constants';

const Discover = ({ userData, navigation }) => {
  const category = (userData.order && userData.order.length) ? userData.order.map(elem => elem.key) : defaultCategories;
  const [activeCategory, setActiveCategory] = React.useState(category[0]);

  const modalRef = useRef(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onClose = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.close();
    }
  }


  const renderModalContent = () => (
    <>
      <View style={modalStyles.wrapper}>
        <Text style={modalStyles.header}>
          SELECT CATEGORY
      </Text>
        <Text style={modalStyles.subheader}>
          Choose one of the categories below and you will see apropriate data
      </Text>
        {renderCategories()}
      </View>
    </>
  );

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    onClose();
  }

  const renderCategories = () => {
    return category.map((category: string) => (
      <View key={category}>
        <TouchableOpacity onPressIn={() => changeCategory(category)}>
          <View style={modalStyles.categoryWrapper}>
            <CheckBox checked={category === activeCategory} color={BUTTON_COLOR} />
            <View style={modalStyles.categoryDescription}>
              <Text style={modalStyles.labelStyle}>
                {categoryLabels[category].label}
              </Text>
              <Text style={modalStyles.descriptionStyle}>
                {categoryLabels[category].description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider style={{ margin: 5 }} />
      </View>
    ));
  }

  return (
    <>
      <Header transparent style={{ backgroundColor: HEADER_BACKGROUND }} iosBarStyle='light-content'>
        <Left></Left>
        <Body>
          <TouchableOpacity onPress={onOpen}>
            <TabHeaderLabel
              text={categoryLabels[activeCategory].label}
              icon={'ios-arrow-down'}
            />
          </TouchableOpacity>
        </Body>
        <Right />
      </Header>

      <Modalize
        ref={modalRef}
        handlePosition="inside"
        modalTopOffset={0}
        snapPoint={450}
        scrollViewProps={{ scrollEnabled: false }}
        modalStyle={{ backgroundColor: HEADER_BACKGROUND }}
        handleStyle={{ backgroundColor: 'gray' }}
      >
        {renderModalContent()}
      </Modalize>

      {activeCategory === 'events' && <Events navigation={navigation} />}
      {activeCategory === 'movies' && <Movies navigation={navigation} />}
      {activeCategory === 'tv_series' && <Series navigation={navigation} />}
      {activeCategory === 'education' && <Courses navigation={navigation} />}
    </>
  )
}

export default Discover;

const modalStyles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
    color: TEXT_COLOR
  },
  subheader: {
    color: TEXT_COLOR_SECONDARY,
    paddingBottom: 20
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%'
  },
  categoryDescription: {
    paddingLeft: 25
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 2,
    color: TEXT_COLOR

  },
  descriptionStyle: {
    color: TEXT_COLOR_SECONDARY,
    fontSize: 13,
    paddingRight: 25
  }
})

