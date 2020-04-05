import { createStackNavigator } from 'react-navigation-stack';
import GreetingsScreen from '../features/auth/GreetingsScreen/GreetingsScreen';
import LoginScreen from '../features/auth/Login/LoginScreen';
import SignUpNavigator from './SignUpNavigator';

const AuthNavigator = createStackNavigator({
  GreetingsScreen: GreetingsScreen,
  Login: LoginScreen,
  SignUp: SignUpNavigator,
},
  {
    headerMode: 'none',
    initialRouteName: 'GreetingsScreen'
  }
)

export default AuthNavigator;