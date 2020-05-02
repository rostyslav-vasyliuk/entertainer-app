import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Discover from '../features/discover/Discover.container';
import Profile from '../features/profile/Profile.container';
import * as React from 'react';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MovieDetails from '../features/movies/MovieDetails/MovieDetails';
import SeriesDetails from '../features/series/SeriesDetails/SeriesDetails';
import ActorDetails from '../features/actor/ActorDetails';
import SeriesByGenre from '../features/series/SeriesByGenre';
import MoviesByGenre from '../features/movies/MoviesByGenre';
import EventDetails from '../features/events/EventDetails/EventDetails';
import EventByCategories from '../features/events/EventByCategories';
import Permissions from '../features/profile/ProfileMenuScreens/Permissions';
import Feedback from '../features/profile/ProfileMenuScreens/Feedback.container';
import Preferences from '../features/profile/ProfileMenuScreens/Preferences.container';
import ChangePassword from '../features/profile/ProfileMenuScreens/ChangePassword';
import ChangeLanguage from '../features/profile/ProfileMenuScreens/ChangeLanguage.container';
import FavouriteEvents from '../features/profile/ProfileMenuScreens/FavouriteEvents';
import FavouriteSeries from '../features/profile/ProfileMenuScreens/FavouriteSeries';
import FavouriteMovies from '../features/profile/ProfileMenuScreens/FavouriteMovies';
import FavouriteCourses from '../features/profile/ProfileMenuScreens/FavouriteCourses';
import EditProfile from '../features/profile/ProfileMenuScreens/EditProfile/EditProfile.container';
import ChangeTheme from '../features/profile/ProfileMenuScreens/Theme/ChangeTheme.container';
import { HEADER_BACKGROUND, BUTTON_COLOR } from '../constants/color-constants';
import Courses from '../features/courses/Courses';
import CoursesByCategories from '../features/courses/CoursesByCategories';
import CourseDetails from '../features/courses/CourseDetails/CourseDetails';
import ChangeEmail from '../features/profile/ProfileMenuScreens/EditProfile/ChangeEmail/ChangeEmail.container';
import ChangeInfo from '../features/profile/ProfileMenuScreens/EditProfile/ChangeInfo/ChangeInfo.container';
import ChangeName from '../features/profile/ProfileMenuScreens/EditProfile/ChangeName/ChangeName.container';
import RecommendationsFeed from '../features/recommendations-feed/Feed';

const RecommendationsStack = createStackNavigator(
  {
    RecommendationsFeed: {
      screen: RecommendationsFeed,
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
    EventDetails: {
      screen: EventDetails
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
    EventByCategories: {
      screen: EventByCategories
    },
    Courses: {
      screen: Courses
    },
    CoursesByCategories: {
      screen: CoursesByCategories
    },
    CourseDetails: {
      screen: CourseDetails
    }
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
  tabBarLabel: 'Events',
  tabBarIcon: (props) => <MaterialCommunityIcons name="theater" size={20} color={props.focused ? 'white' : 'gray'} />
};

const ProfileStack = createStackNavigator(

  {
    Profile: {
      screen: Profile
    },
    Permissions: {
      screen: Permissions
    },
    Feedback: {
      screen: Feedback
    },
    Preferences: {
      screen: Preferences
    },
    ChangePassword: {
      screen: ChangePassword
    },
    ChangeLanguage: {
      screen: ChangeLanguage
    },
    FavouriteEvents: {
      screen: FavouriteEvents
    },
    FavouriteSeries: {
      screen: FavouriteSeries
    },
    FavouriteMovies: {
      screen: FavouriteMovies
    },
    FavouriteCourses: {
      screen: FavouriteCourses
    },
    EditProfile: {
      screen: EditProfile
    },
    ChangeTheme: {
      screen: ChangeTheme
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
  initialRouteName: 'ProfileStack'
});

export default BottomTabNavigator;
