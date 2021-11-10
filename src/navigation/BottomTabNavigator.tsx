import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Discover from '../features/discover/Discover.container';
import Profile from '../features/profile/Profile/Profile.container';
import * as React from 'react';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MovieDetails from '../features/movies/MovieDetails/MovieDetails';
import SeriesDetails from '../features/series/SeriesDetails/SeriesDetails';
import ActorDetails from '../features/actor/ActorDetails';
import SeriesByGenre from '../features/series/SeriesByGenre';
import MoviesByGenre from '../features/movies/MoviesByGenre';
import ChangePassword from '../features/profile/ProfileMenuScreens/ChangePassword/ChangePassword';
import ChangeLanguage from '../features/profile/ProfileMenuScreens/ChangeLanguage/ChangeLanguage.container';
import FavouriteSeries from '../features/profile/ProfileMenuScreens/FavouriteComponents/FavouriteSeries';
import FavouriteMovies from '../features/profile/ProfileMenuScreens/FavouriteComponents/FavouriteMovies';
import EditProfile from '../features/profile/ProfileMenuScreens/EditProfile/EditProfile.container';
import { HEADER_BACKGROUND, BUTTON_COLOR } from '../constants/color-constants';
import ChangeEmail from '../features/profile/ProfileMenuScreens/EditProfile/ChangeEmail/ChangeEmail.container';
import ChangeInfo from '../features/profile/ProfileMenuScreens/EditProfile/ChangeInfo/ChangeInfo.container';
import ChangeName from '../features/profile/ProfileMenuScreens/EditProfile/ChangeName/ChangeName.container';
import RecommendationsFeed from '../features/recommendations-feed/Feed';

const RecommendationsStack = createStackNavigator(
  {
    RecommendationsFeed: {
      screen: RecommendationsFeed,
    },
    MovieDetails: {
      screen: MovieDetails
    },
    SeriesDetails: {
      screen: SeriesDetails
    },
    ActorDetails: {
      screen: ActorDetails
    },
  },
  {
    headerMode: 'none'
  }
);

RecommendationsStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: BUTTON_COLOR,
    style: {
      backgroundColor: HEADER_BACKGROUND,
    },
  },
  tabBarIcon: (props) => <Entypo name="grid" size={28} color={props.focused ? BUTTON_COLOR : 'gray'} />,
};

const DiscoverStack = createStackNavigator(
  {
    Events: {
      screen: Discover
    },
    MovieDetails: {
      screen: MovieDetails
    },
    SeriesDetails: {
      screen: SeriesDetails
    },
    ActorDetails: {
      screen: ActorDetails
    },
    SeriesByGenre: {
      screen: SeriesByGenre
    },
    MoviesByGenre: {
      screen: MoviesByGenre
    },
  },
  {
    headerMode: 'none'
  }
);

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarOptions: {
    activeTintColor: BUTTON_COLOR,
    style: {
      backgroundColor: HEADER_BACKGROUND,
    },
  },
  tabBarIcon: (props) => <MaterialIcons name="explore" size={24} color={props.focused ? BUTTON_COLOR : 'gray'} />
};


const ExploreStack = createStackNavigator(
  {
    Profile: {
      screen: Profile
    }
  },
  {
    headerMode: 'screen'
  }
);

ExploreStack.navigationOptions = {
  tabBarLabel: 'Discover',
  tabBarIcon: (props) => <MaterialCommunityIcons name="theater" size={20} color={props.focused ? 'white' : 'gray'} />
};

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    
    ChangePassword: {
      screen: ChangePassword
    },
    ChangeLanguage: {
      screen: ChangeLanguage
    },
    FavouriteSeries: {
      screen: FavouriteSeries
    },
    FavouriteMovies: {
      screen: FavouriteMovies
    },
    EditProfile: {
      screen: EditProfile
    },
    ChangeEmail: {
      screen: ChangeEmail
    },
    ChangeInfo: {
      screen: ChangeInfo
    },
    ChangeName: {
      screen: ChangeName
    },
    MovieDetails: {
      screen: MovieDetails
    },
    SeriesDetails: {
      screen: SeriesDetails
    },
    ActorDetails: {
      screen: ActorDetails
    },
  },
  {
    headerMode: 'none'
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
    activeTintColor: BUTTON_COLOR,
    style: {
      backgroundColor: HEADER_BACKGROUND,
    },
  },
  tabBarIcon: (props) => <MaterialIcons name="account-circle" size={24} color={props.focused ? BUTTON_COLOR : 'gray'} />
};

const BottomTabNavigator = createBottomTabNavigator({
  RecommendationsStack,
  DiscoverStack,
  ProfileStack
}, {
  initialRouteName: 'RecommendationsStack'
});

export default BottomTabNavigator;
