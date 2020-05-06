import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Image, Text, View, StatusBar, ImageBackground, Linking } from 'react-native';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { eventLabels } from '../constants';
import { monthLabel } from '../../../constants/date-constants';
import { screenWidth } from '../../../constants/screen-contants';
import { Button, Toast } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const EventDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData]: any = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isFavourite, setIsFavourite] = useState(null);

  useEffect(() => {
    const event_id = props.navigation.getParam('event_id', null);
    Axios.get(`/events/details/${event_id}`).then((response: AxiosResponse) => {
      setEventData(response.data.event);
      setRecommendations(response.data.recommendations);
      setIsFavourite(response.data.isFavourite)
      setIsLoading(false);
    });
  }, []);

  const getDateString = (releaseDate: string) => {
    if (!releaseDate) {
      return '';
    }
    const date = new Date(releaseDate);
    const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateString;
  }

  const getCategoriesString = (categories: string[] = []) => {
    let finalString = '';
    categories.forEach((category: string, index: number) => {
      finalString += eventLabels[category]

      if (index !== categories.length - 1) {
        finalString += ', '
      }
    })

    return finalString;
  }

  const onEventNavigate = (event_id: string) => {
    props.navigation.push('EventDetails', { event_id });
  }

  const addToFavourites = () => {
    Axios.post('/events/favourite', { id: eventData._id }).then((response: AxiosResponse) => {
      setIsFavourite(response.data.isFavourite);
      if (response.data.isFavourite) {
        Toast.show({
          text: 'Added to favourites'
        })
      } else {
        Toast.show({
          text: 'Removed from favourites'
        })
      }
    }).catch(() => {

    })
  }

  const onLinkOpen = (url: string) => {
    Linking.openURL(url);
  }

  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle='light-content' />
      <ScrollView style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: eventData.img }}
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>
          {eventData.title}
        </Text>

        <View style={styles.infoMovieMain}>
          <View>
            <Text style={styles.duration}>
              {'City: ' + eventData.city}
            </Text>

            <Text style={styles.duration}>
              {'Date: ' + getDateString(eventData.date)}
            </Text>

            <Text style={styles.duration}>
              {'Categories: ' + getCategoriesString(eventData.categories)}
            </Text>

            {eventData.price &&
              <Text style={styles.duration}>
                {'Price: ' + eventData.price + ' UAH'}
              </Text>}

          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => addToFavourites()}>
              {isFavourite ?
                <AntDesign name={'star'} size={30} color={'#1ecaff'} />
                :
                <AntDesign name={'staro'} size={30} color={'#1ecaff'} />
              }
            </TouchableOpacity>
          </View>
        </View>


        <Button full style={styles.button} onPress={() => onLinkOpen(eventData.link)}>
          <Text style={{ color: '#fff' }}>
            {'Visit page'}
          </Text>
        </Button>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>Recommendations</Text>
          <ScrollView horizontal>
            {recommendations.map((elem) =>
              <View key={elem.id}>
                <TouchableOpacity style={styles.similarMovieContainer} onPress={() => onEventNavigate(elem._id)}>
                  <ImageBackground source={{ uri: elem.img }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 4 }} />
                  <View>
                    <Text style={styles.country}>
                      {elem.title}
                    </Text>
                    <Text style={styles.date}>
                      {getDateString(elem.date)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

export default EventDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030405',
    color: '#fff'
  },
  imageWrapper: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#030405',
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
  },
  image: {
    flex: 1,
    width: '70%',
    height: 370,
    borderRadius: 2,
    backgroundColor: '#030405'
  },
  country: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  duration: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 4
  },
  date: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 4
  },
  infoMovieMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
  },
  overviewBlock: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  overviewTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 5,
  },
  movieImageStyle: {
    width: 150,
    height: 225
  },
  similarMovieContainer: {
    width: 150,
    marginRight: 10,
    paddingBottom: 15,
    paddingTop: 15
  },
  button: {
    marginBottom: 5,
    height: 50,
    marginTop: 15,
    width: screenWidth - 26,
    borderRadius: 5,
    backgroundColor: '#fe4b66',
    marginLeft: 13
  },
  iconWrapper: {
    paddingRight: 10
  }
})
