import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import ProgressCircle from 'react-native-progress-circle'
import { Entypo } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { BACKGROUND, TEXT_COLOR_SECONDARY, HEADER_BACKGROUND } from '../../../constants/color-constants';
import { getMoneyUserFriendly, getMovieGenre, getThreeGenres, getVideoBackground, getYear, onTrailerNavigate, percent2color } from '../../shared/details-utils';
import { styles } from './styles';
import Rating from '../../../ui-components/Rating/Rating';
import { Toast } from 'native-base';

const MovieDetails = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [movieData, setMovieData]: any = useState({});
	const [recommendations, setRecommendations] = useState([]);
	const [rating, setRating] = useState(null);

	useEffect(() => {
		const movie_id = props.navigation.getParam('movie_id', null);
		Axios.get(`/movies/details/${movie_id}`).then((response: AxiosResponse) => {
			setMovieData(response.data);
			setIsLoading(false);
			setRating(response.data.userRating);
		});

		Axios.get(`/movies/recommendations?id=${movie_id}`).then((response: AxiosResponse) => {
			setRecommendations(response.data.results);
		});
	}, []);

	if (isLoading) {
		return (
			<View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: BACKGROUND }}>
				<ActivityIndicator size="small" color="#fff" />
			</View>
		)
	}

	const navigate = (current_id) => {
		props.navigation.push('MovieDetails', {
			movie_id: current_id
		});
	};

	const onActorNavigate = (current_id) => {
		props.navigation.push('ActorDetails', {
			actor_id: current_id
		});
	};

	const onRatingComplete = (value) => {
		setRating(value);
		Axios.post(
			`/movies/set-rating`,
			{ movieRating: Number(value), genres: movieData.genres, movieID: movieData.id }
		)
			.then(() => {
				Toast.show({
					text: "Thanks, your rate was saved!",
					buttonText: "Okay",
					position: "bottom"
				});
			});
	};

	return (
		<>
			<ScrollView style={styles.container}>
				{movieData.backdrop_path ?
					<Image
						source={{ uri: `https://image.tmdb.org/t/p/w1280/${movieData.poster_path}` }}
						style={styles.image}
						placeholderStyle={{ backgroundColor: '#000000' }}
						PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
					/>
					: (
						<View style={{ height: 430, width: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: HEADER_BACKGROUND }}>
							<Entypo name='image' style={{ color: TEXT_COLOR_SECONDARY, fontSize: 40 }} />
						</View>
					)
				}
				<Text style={styles.title}>{movieData.title}</Text>
				<View style={styles.infoMovieMain}>
					<View>
						<Text style={styles.yearAndCountry}>
							{`${getYear(movieData.release_date)}`}
						</Text>
						<Text style={styles.country}>{getThreeGenres(movieData.genres)}</Text>
						{movieData.production_countries.length > 0 &&
							<Text style={styles.country}>Country: {movieData.production_countries[0].name}</Text>
						}
						<Text style={styles.duration}>
							Budget: {getMoneyUserFriendly(movieData.budget)}
						</Text>
						<Text style={styles.duration}>
							Box Office: {getMoneyUserFriendly(movieData.revenue)}
						</Text>
						<Text style={styles.duration}>Duration: {movieData.runtime} min</Text>
					</View>
					<View style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
						<ProgressCircle
							percent={movieData.vote_average * 10}
							radius={20}
							borderWidth={5}
							color={percent2color(movieData.vote_average * 10)}
							shadowColor="#999"
							bgColor='#030405'
						>
							<Text style={{ fontSize: 12, color: '#fff' }}>{movieData.vote_average / 2}</Text>
						</ProgressCircle>
					</View>
				</View>

				<Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

				<View style={styles.overviewBlock}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
						<Text style={styles.overviewTitle}>Overview</Text>
						<View style={styles.additionalButtons}>
						</View>
					</View>

					<Text style={styles.duration}>{movieData.overview}</Text>
				</View>


				<Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />


				<View style={styles.overviewBlock}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
						<Text style={styles.overviewTitle}>Rate the movie</Text>
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
						{movieData.credits.cast.map((elem, index) => {
							if (index <= 20) {
								return (
									<TouchableOpacity onPress={() => onActorNavigate(elem.id)} key={`${elem.id}${index}`}>
										<View style={styles.castBlock} key={elem.id}>
											<Image
												source={{ uri: `https://image.tmdb.org/t/p/w500/${elem.profile_path}` }}
												style={styles.imageCast}
												borderRadius={100}
												placeholderStyle={{ backgroundColor: '#000000' }}
												PlaceholderContent={<ActivityIndicator size='large' color="#fff" />}
											/>
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
					<TouchableOpacity onPress={() => onTrailerNavigate(movieData)}>
						<View style={styles.trailerBlock}>
							<ImageBackground source={{ uri: getVideoBackground(movieData) }} style={{ height: 170, width: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }} imageStyle={{ height: 170, width: 320, borderRadius: 2 }}>
								<Image source={require('../../../assets/youtube-play.png')} style={styles.playButton} borderRadius={8} />
							</ImageBackground>
						</View>
					</TouchableOpacity>
				</View>

				<Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

				<View style={styles.overviewBlock}>
					<Text style={styles.overviewTitle}>You may like</Text>
					<ScrollView horizontal>
						{recommendations.map((elem) =>
							<View key={elem.id}>
								<TouchableOpacity style={styles.similarMovieContainer} onPress={() => navigate(elem.id)}>
									<ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.poster_path }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 8 }} />
									<View>
										<Text style={styles.country}>
											{elem.title}
										</Text>
										<Text style={styles.country}>
											{`${getYear(elem.release_date)}, ${getMovieGenre(elem.genre_ids)}`}
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

export default MovieDetails;
