import { StyleSheet } from "react-native";
import { TEXT_COLOR } from '../../../constants/color-constants';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#030405',
		color: '#fff'
	},
	title: {
		color: TEXT_COLOR,
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
		height: 430,
	},
	country: {
		color: TEXT_COLOR,
		fontSize: 14,
	},
	duration: {
		color: TEXT_COLOR,
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
		fontSize: 20,
		fontWeight: '700',
		paddingBottom: 10,
	},
	movieImageStyle: {
		width: 140,
		height: 200,
	},
	similarMovieContainer: {
		width: 150,
		marginRight: 5,
	},
	castBlock: {
		width: 150,
		margin: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems:'center'
	},
	imageCast: {
		height: 130,
		width: 130,
	},
	realName: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 13,
		paddingTop: 5,
		textAlign: 'center'
	},
	characterName: {
		color: '#b2b2b2',
		fontSize: 11,
		paddingTop: 2,
		textAlign: 'center'
	},
	playButton: {
		width: 70,
		height: 50,
		opacity: 0.9
	},
	trailerBlock: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10
	},
});
