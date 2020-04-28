
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import BottomTabNavigator from './bottom-tab-navigator';
import AppIntroOverlay from '../ui-components/app-intro-overlay/AppIntroOverlay';
import NavigationController from './navigation-controller';
import AuthNavigator from './AuthNavigator';

const app = createSwitchNavigator(
  {
    NavigationController: NavigationController,
    Intro: AppIntroOverlay,
    Auth: AuthNavigator,
    App: BottomTabNavigator
  },
  {
    initialRouteName: 'NavigationController'
  }
);

const AppContainer = createAppContainer(app);

export default AppContainer;

