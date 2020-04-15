import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Discover from '../features/discover/Discover';
import Profile from '../features/profile/Profile';
import * as React from 'react';
import { Entypo, AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import MovieDetails from '../features/movies/MovieDetails/MovieDetails';
import SeriesDetails from '../features/series/SeriesDetails/SeriesDetails';

const HomeStack = createStackNavigator(
  {
    Discover: {
      screen: Discover,
    },
  },
  {
    headerMode: 'screen'
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: () => <Entypo name="grid" size={32} color="black" />,
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
    }
  },
  {
    headerMode: 'none'
  }
);

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: () => <AntDesign name="calendar" size={26} color="black" />
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
  tabBarIcon: () => <MaterialCommunityIcons name="theater" size={26} color="black" />
};

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile
    }
  },
  {
    headerMode: 'screen'
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: () => <FontAwesome name="user-o" size={26} color="black" />
};

const BottomTabNavigator = createBottomTabNavigator({
  HomeStack,
  DiscoverStack,
  ExploreStack,
  ProfileStack
}, {
  initialRouteName: 'DiscoverStack'
});

export default BottomTabNavigator;
