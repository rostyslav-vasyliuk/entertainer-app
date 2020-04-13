import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import ProgressCircle from 'react-native-progress-circle'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import GenresData from './Genres';
import { Header } from 'native-base';

const MovieDetails = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [movieData, setMovieData]: any = useState({});

	useEffect(() => {
		const movie_id = props.navigation.getParam('movie_id', null);
		Axios.get(`/movies/details/${movie_id}`).then((response: AxiosResponse) => {
			setMovieData(response.data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <ActivityIndicator />
	}

	const getYear = (releaseDate) => {
		return releaseDate.slice(0, 4);
	}

	const getGenre = (genre_id) => {
		return GenresData.find((item) => item.movieDB_id === genre_id).name;
	}

	const getVideoBackground = () => {
		return `https://i3.ytimg.com/vi/${movieData.videos.results[0].key}/hqdefault.jpg`;
	}

	const getGenres = (genres) => {
		let finalString = '';
		genres.map((elem, index) => { if (index < 3) finalString += `${elem.name}, ` });
		finalString = finalString.slice(0, finalString.length - 2);
		return finalString;
	}

	const getMoneyUserFriendly = (current) => {
		let counter = 0;
		if (current / 1000 > 1) counter++;
		if (current / 1000000 > 1) counter++;
		if (current / 1000000000 > 1) counter++;

		if (counter === 0) return current;
		if (counter === 1) return `$ ${(current / 1000).toFixed(2)}k`;
		if (counter === 2) return `$ ${(current / 1000000).toFixed(2)}m`;
		if (counter === 3) return `$ ${(current / 1000000000).toFixed(2)}b`;
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

	return (
		<>
			<ScrollView style={styles.container}>
				{movieData.backdrop_path ?
					<Image
						source={{ uri: `https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}` }}
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
				<Text style={styles.title}>{movieData.title}</Text>
				<View style={styles.infoMovieMain}>
					<View>
						<Text style={styles.yearAndCountry}>
							{`${getYear(movieData.release_date)}`}
						</Text>
						<Text style={styles.country}>{getGenres(movieData.genres)}</Text>
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
					<View style={{ alignItems: 'center' }}>
						{/* <TouchableOpacity onPress={() => changeMyList(movieData)} style={{ paddingBottom: 5 }}>
            {state.addedToFavourite ?
              <AntDesign name='star' color='#1ecaff' size={32} />
              :
              <AntDesign name='staro' color='#1ecaff' size={32} />
            }
          </TouchableOpacity> */}
						<ProgressCircle
							percent={movieData.vote_average * 10}
							radius={20}
							borderWidth={5}
							color={percent2color(movieData.vote_average * 10)}
							shadowColor="#999"
							bgColor='#030405'
							style={styles.voteCircle}
						>
							<Text style={{ fontSize: 12, color: '#fff' }}>{movieData.vote_average}</Text>
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

					<Text style={styles.duration}>{movieData.overview}</Text>
				</View>

				<Divider style={{ backgroundColor: '#2d3138', margin: 10 }} />

				<View style={styles.overviewBlock}>
					<Text style={styles.overviewTitle}>Cast</Text>
					<ScrollView horizontal>
						{movieData.credits.cast.map((elem, index) => {
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

				<ImageBackground source={{uri: getVideoBackground()}} style={{height: 200, width: '100%'}} imageStyle={{borderRadius: 10, height: 200, width: 300}}/>
				
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

export default MovieDetails;


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
		height: 280,
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
	}
});
