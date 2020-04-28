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
import Modal from 'react-native-modal';
import { screenWidth, screenHeight } from '../../constants/screen-contants';
import { BACKGROUND, TEXT_COLOR, TEXT_COLOR_SECONDARY, HEADER_BACKGROUND } from '../../constants/color-constants';

const Discover = (props) => {
  const [activeCategory, setActiveCategory] = React.useState('events');
  const [isEventCityModalVisible, setIsEventCityModalVisible] = React.useState(false);

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

  const category = ['events', 'movies', 'tv_series', 'education'];
  const categoryLabels = {
    events: {
      label: 'Events',
      description: 'Different types of events (like concerts, festivals etc.)'
    },
    cinema: {
      label: 'Cinema',
      description: 'Search for new moview to watch it in cinema in your town'
    },
    movies: {
      label: 'Movies',
      description: 'Search for all movies in our database to get something interesting for you'
    },
    tv_series: {
      label: 'TV Series',
      description: 'Find your favourite TV series with our recommendations'
    },
    education: {
      label: 'Education',
      description: 'Real Japan rolls? Or a huge Cheesburger? Order to door? Yeah, just click here!'
    },
  }

  const changeCategory = (category: string) => {
    console.log(category);
    setActiveCategory(category);
    onClose();
  }

  const renderCategories = () => {
    return category.map((category: string) => (
      <View key={category}>
        <TouchableOpacity onPressIn={() => changeCategory(category)} style={modalStyles.touchable}>
          <View style={modalStyles.categoryWrapper}>
            <CheckBox checked={category === activeCategory} />
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
      <Header transparent style={{backgroundColor: HEADER_BACKGROUND}} iosBarStyle='light-content'>
        <Left />
        <Body>
          <TouchableOpacity onPress={onOpen}>
            <TabHeaderLabel
              text={categoryLabels[activeCategory].label}
              icon={'ios-arrow-down'}
            />
          </TouchableOpacity>
        </Body>
        <Right>
          {/* <Text onPress={() => setIsEventCityModalVisible(true)}>s</Text> */}
        </Right>
      </Header>

      <Modalize
        ref={modalRef}
        handlePosition="inside"
        modalTopOffset={0}
        snapPoint={450}
        scrollViewProps={{ scrollEnabled: false }}
        modalStyle={{ backgroundColor: HEADER_BACKGROUND }}
      >
        {renderModalContent()}
      </Modalize>

      {activeCategory === 'events' && <Events navigation={props.navigation} />}
      {activeCategory === 'movies' && <Movies navigation={props.navigation} />}
      {activeCategory === 'tv_series' && <Series navigation={props.navigation} />}

      <Modal
        deviceWidth={screenWidth}
        deviceHeight={screenHeight}
        isVisible={isEventCityModalVisible}
        backdropOpacity={0.3}
      >
        <View style={{ height: 100, width: 100, backgroundColor: 'white' }}>
          <Text onPress={() => setIsEventCityModalVisible(false)}>Hello!</Text>
        </View>
      </Modal>
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
  },
  touchable: {
    // height: 80
  }
})

