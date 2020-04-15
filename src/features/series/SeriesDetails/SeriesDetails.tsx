import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Image, ImageBackground, Linking } from 'react-native';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import ProgressCircle from 'react-native-progress-circle'
import { Entypo } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

const SeriesDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seriesData, setseriesData]: any = useState({});
  const [seasonsData, setSeasonsData]: any = useState({});
  const [seasonIsLoading, setSeasonIsLoading] = useState(null);

  useEffect(() => {
    const series_id = props.navigation.getParam('series_id', null);
    Axios.get(`/tv-series/details/${series_id}`).then((response: AxiosResponse) => {
      setseriesData(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <ActivityIndicator />
  }

  const getYear = (releaseDate) => {
    return releaseDate.slice(0, 4);
  }

  const getVideoBackground = () => {
    // console.log(`https://i3.ytimg.com/vi/${seriesData.videos.results[0].key}/maxresdefault.jpg`)
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
  // const seasonsLoading = {};
  const getSeasonInfo = (season_number: number) => {
    Axios.get(`/tv-series/season/details?id=${seriesData.id}&season_number=${season_number}`)
      .then((response: AxiosResponse) => {
        const seasonsDataCopy = { ...seasonsData };
        seasonsDataCopy[season_number] = response.data;
        setSeasonsData(seasonsDataCopy);
        setSeasonIsLoading(null);
      });
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {seriesData.backdrop_path ?
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w1280/${seriesData.poster_path}` }}
            style={styles.image}
            PlaceholderStyle={{ backgroundColor: '#000000' }}
            PlaceholderContent={<ActivityIndicator size='large' color="#fff" />}
          />
          :
          <Image
            PlaceholderContent={<Entypo name='image' size={60} color='#8c939e' />}
            placeholderStyle={{ backgroundColor: '#000000' }}
            style={styles.image}
          />
        }
        <Text style={styles.title}>{seriesData.name}</Text>
        <View style={styles.infoMovieMain}>
          <View>
            <Text style={styles.yearAndCountry}>
              {`${getYear(seriesData.first_air_date)}`}
            </Text>
            <Text style={styles.country}>{getGenres(seriesData.genres)}</Text>
            {/* {seriesData.production_countries.length > 0 &&
							<Text style={styles.country}>Country: {seriesData.production_countries[0].name}</Text>
						} */}
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
              style={styles.voteCircle}
            >
              <Text style={{ fontSize: 12, color: '#fff' }}>{seriesData.vote_average}</Text>
            </ProgressCircle>
          </View>
        </View>
        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <View style={styles.additionalButtons}>
              <TouchableOpacity style={{ paddingRight: 5 }}>
                <Entypo name='share-alternative' color='#e8ecf2' size={28} />
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
              if (index <= 10) {
                return (
                  <View style={styles.castBlock} key={elem.id}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${elem.profile_path}` }} style={styles.imageCast} />
                    <Text style={styles.realName}>{elem.name}</Text>
                    <Text style={styles.characterName}>{elem.character}</Text>
                  </View>
                )
              }
            })}
          </ScrollView>
        </View>

        <Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

        <View style={styles.overviewBlock}>
          <Text style={styles.overviewTitle}>Trailer</Text>
          <TouchableOpacity onPress={onTrailerClick}>
            <View style={styles.trailerBlock}>
              <ImageBackground source={{ uri: getVideoBackground() }} style={{ height: 170, width: 320 }} imageStyle={{ height: 170, width: 320 }} />
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
                                {`Release: ${episode.air_date}`}
                              </Text>
                              {/* <Text style={styles.episodeDate}>
                                {'Overview: '}
                              </Text> */}
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

        {/* <View style={styles.overviewBlock}>
        <Text style={styles.overviewTitle}>Similar movies</Text>
        <ScrollView horizontal>
          {state.similarMoviesData.map((elem) =>
            <View key={elem.id}>
              <TouchableOpacity style={styles.similarMovieContainer} onPress={() => updateView(elem.id)}>
                <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.backdrop_path }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 15 }}>
                </ImageBackground>
                <View style={styles.textContainer}>
                  <Text style={styles.country}>{elem.title}</Text>
                  <Text style={styles.country}>
                    {`${getYear(elem.release_date)}, ${getGenre(elem.genre_ids[0])}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View> */}
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
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 450,
    backgroundColor: '#030405'
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
  voteCircle: {
    marginRight: 40,
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
    height: 180,
  },
  similarMovieContainer: {
    width: 150,
    marginRight: 10,
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
  linkButton: {
    marginTop: 15,
    borderColor: '#fff',
    borderWidth: 1,
  },
  linkButtonTitle: {
    color: '#fff',
  },
  addFavorite: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
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
    // marginBottom: 25
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
    // justifyContent: 'center',
    alignItems: 'center'
  },
  episodeInfoWrapper: {
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15
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
  }
})
