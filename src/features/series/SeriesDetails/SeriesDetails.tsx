import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, ImageBackground, Linking } from 'react-native';
import { Image } from 'react-native-elements';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import ProgressCircle from 'react-native-progress-circle'
import { Entypo } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { seriesGenres } from '../constants';
import { monthLabel } from '../../../constants/date-constants';
import { Toast } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { screenHeight } from '../../../constants/screen-contants';
import { BACKGROUND, TEXT_COLOR_SECONDARY, HEADER_BACKGROUND } from '../../../constants/color-constants';

const SeriesDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seriesData, setseriesData]: any = useState({});
  const [seasonsData, setSeasonsData]: any = useState({});
  const [seasonIsLoading, setSeasonIsLoading] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isFavourite, setIsFavourite] = useState(null);

  useEffect(() => {
    const series_id = props.navigation.getParam('series_id', null);
    Axios.get(`/tv-series/details/${series_id}`).then((response: AxiosResponse) => {
      setseriesData(response.data);
      setIsFavourite(response.data.isFavourite);
      setIsLoading(false);
    });

    Axios.get(`/tv-series/recommendations?id=${series_id}`).then((response: AxiosResponse) => {
      setRecommendations(response.data.results);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={{ height: screenHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    )
  }

  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.slice(0, 4);
  }

  const getDateString = (releaseDate: string) => {
    if (!releaseDate) {
      return '';
    }
    const date = new Date(releaseDate);
    const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateString;
  }

  const getVideoBackground = () => {
    if (seriesData.videos.results.length === 0) {
      return '';
    }
    return `https://i3.ytimg.com/vi/${seriesData.videos.results[0].key}/maxresdefault.jpg`;
  }

  const onTrailerClick = () => {
    Linking.openURL(`https://youtube.com/watch?v=${seriesData.videos.results[0].key}`);
  }

  const getGenres = (genres) => {
    let finalString = '';
    genres.map((elem, index) => { if (index < 3) finalString += `${elem.name}, ` });
    finalString = finalString.slice(0, finalString.length - 2);
    return finalString;
  }

  const getGenre = (genre_id) => {
    if (seriesGenres.find((item) => Number(item.movieDB_id) === genre_id)) {
      return seriesGenres.find((item) => Number(item.movieDB_id) === genre_id).genre;
    }
  }

  const percent2color = (perc) => {
    let r, g, b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    }
    else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  const getSeasonInfo = (season_number: number) => {
    Axios.get(`/tv-series/season/details?id=${seriesData.id}&season_number=${season_number}`)
      .then((response: AxiosResponse) => {
        const seasonsDataCopy = { ...seasonsData };
        seasonsDataCopy[season_number] = response.data;
        setSeasonsData(seasonsDataCopy);
        setSeasonIsLoading(null);
      });
  }

  const navigate = (current_id) => {
    props.navigation.push('SeriesDetails', {
      series_id: current_id
    })
  }

  const onActorNavigate = (current_id) => {
    props.navigation.push('ActorDetails', {
      actor_id: current_id
    })
  }

  const addToFavourites = () => {
    Axios.post('/tv-series/favourite', { id: seriesData.id }).then((response: AxiosResponse) => {
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

  return (
    <>
      <ScrollView style={styles.container}>
        {console.log(seriesData.poster_path)}
        {seriesData.poster_path ?
          <Image
            placeholderStyle={{ backgroundColor: '#000000' }}
            PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
            source={{ uri: `https://image.tmdb.org/t/p/w1280/${seriesData.poster_path}` }}
            style={styles.image}
          />
          : (
            <View style={{
              flex: 1,
              width: '100%',
              height: 450, justifyContent: 'center', alignItems: 'center', backgroundColor: HEADER_BACKGROUND
            }}>
              <Entypo name='image' style={{ color: TEXT_COLOR_SECONDARY, fontSize: 30 }} />
            </View>
          )
        }
        <Text style={styles.title}>{seriesData.name}</Text>
        <View style={styles.infoMovieMain}>
          <View>
            <Text style={styles.yearAndCountry}>
              {`${getYear(seriesData.first_air_date)}`}
            </Text>
            <Text style={styles.country}>{getGenres(seriesData.genres)}</Text>
            <Text style={styles.duration}>
              {'Seasons: ' + seriesData.number_of_seasons}
            </Text>
            <Text style={styles.duration}>
              {'Episodes: ' + seriesData.number_of_episodes}
            </Text>
            <Text style={styles.duration}>Duration: {seriesData.episode_run_time[0]} min</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <ProgressCircle
              percent={seriesData.vote_average * 10}
              radius={20}
              borderWidth={5}
              color={percent2color(seriesData.vote_average * 10)}
              shadowColor="#999"
              bgColor='#030405'
            >
              <Text style={{ fontSize: 12, color: '#fff' }}>{seriesData.vote_average}</Text>
            </ProgressCircle>

            <View style={{ paddingTop: 15 }}>
              <TouchableOpacity onPress={() => addToFavourites()}>
                {isFavourite ?
                  <AntDesign name={'star'} size={30} color={'#1ecaff'} />
                  :
                  <AntDesign name={'staro'} size={30} color={'#1ecaff'} />
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <View style={styles.additionalButtons}>
              <TouchableOpacity style={{ paddingRight: 5 }}>
                {/* <Entypo name='share-alternative' color='#e8ecf2' size={28} /> */}
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.duration}>{seriesData.overview}</Text>
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>Cast</Text>
          <ScrollView horizontal>
            {seriesData.credits.cast.map((elem, index) => {
              if (index <= 20) {
                return (
                  <TouchableOpacity onPress={() => onActorNavigate(elem.id)}>
                    <View style={styles.castBlock} key={elem.id}>
                      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${elem.profile_path}` }} style={styles.imageCast} />
                      <Text style={styles.realName}>{elem.name}</Text>
                      <Text style={styles.characterName}>{elem.character}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>
            {'Trailer'}
          </Text>
          <TouchableOpacity onPress={onTrailerClick}>
            <View style={styles.trailerBlock}>
              <ImageBackground source={{ uri: getVideoBackground() }} style={{ height: 170, width: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }} imageStyle={{ height: 170, width: 320, borderRadius: 2 }}>
                <Image source={require('../../../assets/youtube-play.png')} style={styles.playButton} />
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>Seasons</Text>
          <View>
            {seriesData.seasons.map((season) => (
              <>
                <View style={styles.seasonBlock}>
                  <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + season.poster_path }} style={styles.seasonImageStyle} />
                  <View style={styles.seasonInfo}>
                    <Text style={styles.seasonName}>
                      {season.name}
                    </Text>
                    <Text style={styles.seasonYear}>
                      {getYear(season.air_date)} | {season.episode_count} Episodes
                      </Text>
                    <Text style={styles.seasonOverview} numberOfLines={9}>
                      {season.overview}
                    </Text>
                  </View>
                </View>

                {!Boolean(seasonsData[season.season_number]) && seasonIsLoading === season.season_number && (
                  <View style={styles.expandBlock}>
                    <ActivityIndicator />
                  </View>
                )}

                {!Boolean(seasonsData[season.season_number]) && seasonIsLoading !== season.season_number && (
                  <TouchableOpacity onPress={() => {
                    setSeasonIsLoading(season.season_number)
                    getSeasonInfo(season.season_number)
                  }}>
                    <View style={styles.expandBlock}>
                      <Text style={styles.showMoreLabel}>
                        {'Show more'}
                      </Text>
                      <Entypo name='chevron-down' style={styles.showMoreIcon} />
                    </View>
                  </TouchableOpacity>
                )}

                {Boolean(seasonsData[season.season_number]) && (
                  <View style={styles.allEpisodesWrapper}>
                    {seasonsData[season.season_number].episodes.map((episode, index) => {
                      return (
                        <>
                          <View style={styles.episodeBlock}>
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + episode.still_path }} style={styles.episodeImageStyle} />

                            <View style={styles.episodeInfoWrapper}>
                              <Text style={styles.episodeTitle}>
                                {`${episode.episode_number}. ${episode.name}`}
                              </Text>
                              <Text style={styles.episodeDate}>
                                {`${getDateString(episode.air_date)}`}
                              </Text>
                              <Text style={styles.episodeOverview}>
                                {episode.overview}
                              </Text>
                            </View>

                          </View>

                          {index < seasonsData[season.season_number].episodes.length - 1 ? (
                            <Divider style={{ backgroundColor: '#2d3138', margin: 15 }} />
                          ) : (
                              <TouchableOpacity onPress={() => {
                                const seasonsDataCopy = { ...seasonsData };
                                seasonsDataCopy[season.season_number] = null;
                                setSeasonsData(seasonsDataCopy);
                              }}>
                                <View style={styles.expandBlock}>
                                  <Entypo name='chevron-up' style={styles.showMoreIcon} />
                                  <Text style={styles.showMoreLabel}>
                                    {'Hide episodes'}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )
                          }
                        </>
                      )
                    })}
                  </View>
                )}
                <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

              </>
            ))}
          </View>
        </View>

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>You may like</Text>
          <ScrollView horizontal>
            {recommendations.map((elem) =>
              <View key={elem.id}>
                <TouchableOpacity style={styles.similarMovieContainer} onPress={() => navigate(elem.id)}>
                  <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.poster_path }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 8 }} />
                  <View>
                    <Text style={styles.country}>
                      {elem.name}
                    </Text>
                    <Text style={styles.country}>
                      {`${getYear(elem.first_air_date)}, ${getGenre(elem.genre_ids[0])}`}
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

export default SeriesDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030405',
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 24,
    padding: 10,
    paddingLeft: 15,
  },
  additionalButtons: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 450
  },
  country: {
    color: '#fff',
    fontSize: 14,
  },
  duration: {
    color: '#fff',
    fontSize: 14,
  },
  yearAndCountry: {
    color: '#ffa',
    fontSize: 14,
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
    paddingBottom: 15
  },
  castBlock: {
    width: 150,
    margin: 5,
  },
  imageCast: {
    height: 180,
    width: 150,
    borderRadius: 5,
  },
  realName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    paddingTop: 5,
  },
  characterName: {
    color: '#b2b2b2',
    fontSize: 12,
    paddingTop: 2,
  },
  seasonImageStyle: {
    width: 130,
    height: 190,
    borderRadius: 8
  },
  episodeImageStyle: {
    width: 320,
    height: 190,
    borderRadius: 8
  },
  trailerBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  seasonBlock: {
    flexDirection: 'row',
    paddingTop: 15
  },
  seasonInfo: {
    marginLeft: 15,
    width: '60%'
  },
  seasonName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20
  },
  seasonYear: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    paddingTop: 5
  },
  seasonOverview: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 15,
    textAlign: 'justify',
    paddingRight: 3,
    overflow: 'hidden',
  },
  expandBlock: {
    paddingTop: 15,
    alignItems: 'center',
    height: 45
  },
  showMoreLabel: {
    fontSize: 12,
    color: 'white'
  },
  showMoreIcon: {
    fontSize: 15,
    color: '#fff'
  },
  allEpisodesWrapper: {
    paddingTop: 30
  },
  episodeBlock: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  episodeInfoWrapper: {
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%'
  },
  episodeTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    paddingTop: 10
  },
  episodeDate: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 10
  },
  episodeOverview: {
    color: '#fff',
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 2,
    textAlign: 'justify',
    paddingRight: 3,
    overflow: 'hidden',
  },
  playButton: {
    width: 70,
    height: 50,
    opacity: 0.9
  }
})
