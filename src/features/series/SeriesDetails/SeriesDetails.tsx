import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import ProgressCircle from 'react-native-progress-circle'
import { Entypo } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { monthLabel } from '../../../constants/date-constants';
import { BACKGROUND, TEXT_COLOR_SECONDARY, HEADER_BACKGROUND } from '../../../constants/color-constants';
import { getTVGenre, getThreeGenres, getVideoBackground, onTrailerNavigate, percent2color, getYear } from '../../shared/details-utils';
import { styles } from './styles';
import { Toast } from 'native-base';
import Rating from '../../../ui-components/Rating/Rating';

const SeriesDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seriesData, setseriesData]: any = useState({});
  const [seasonsData, setSeasonsData]: any = useState({});
  const [seasonIsLoading, setSeasonIsLoading] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const series_id = props.navigation.getParam('series_id', null);
    Axios.get(`/tv-series/details/${series_id}`).then((response: AxiosResponse) => {
      setseriesData(response.data);
      setIsLoading(false);
      setRating(response.data.userRating);
    });

    Axios.get(`/tv-series/recommendations?id=${series_id}`).then((response: AxiosResponse) => {
      setRecommendations(response.data.results);
    });
  }, []);

  	const onRatingComplete = (value) => {
		setRating(value);
		Axios.post(
			`/tv-series/set-rating`,
			{ seriesRating: Number(value), genres: seriesData.genres, seriesID: seriesData.id }
		)
			.then(() => {
				Toast.show({
					text: "Thanks, your rate was saved!",
					buttonText: "Okay",
					position: "bottom"
				});
			});
	};

  if (isLoading) {
    return (
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    )
  }

  const getDateString = (releaseDate: string) => {
    if (!releaseDate) {
      return '';
    }
    const date = new Date(releaseDate);
    const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateString;
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

  return (
    <>
      <ScrollView style={styles.container}>
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
            <Text style={styles.country}>{getThreeGenres(seriesData.genres)}</Text>
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
              <Text style={{ fontSize: 12, color: '#fff' }}>{seriesData.vote_average / 2}</Text>
            </ProgressCircle>
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
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
						<Text style={styles.overviewTitle}>Rate the series</Text>
					</View>

					<View>
						<Rating
							total={5}
							active={rating}
							onChange={onRatingComplete}
						/>
					</View>
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
                      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${elem.profile_path}` }} borderRadius={100} style={styles.imageCast} />
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
          <TouchableOpacity onPress={() => onTrailerNavigate(seriesData)}>
            <View style={styles.trailerBlock}>
              <ImageBackground source={{ uri: getVideoBackground(seriesData) }} style={{ height: 170, width: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }} imageStyle={{ height: 170, width: 320, borderRadius: 2 }}>
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
                  <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + season.poster_path }} borderRadius={8} style={styles.seasonImageStyle} />
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
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + episode.still_path }} borderRadius={8} style={styles.episodeImageStyle} />

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
                      {`${getYear(elem.first_air_date)}, ${getTVGenre(elem.genre_ids)}`}
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
