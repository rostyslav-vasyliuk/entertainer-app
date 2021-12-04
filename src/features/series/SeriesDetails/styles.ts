import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    height: 600
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
