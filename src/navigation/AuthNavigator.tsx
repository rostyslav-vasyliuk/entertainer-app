import { createStackNavigator } from 'react-navigation-stack';
import GreetingsScreen from '../features/auth/GreetingsScreen/GreetingsScreen';
import LoginScreen from '../features/auth/Login/LoginScreen';
import SignUpNavigator from './SignUpNavigator';
import ForgotPasswordNavigator from './ForgotPasswordNavigator';

const AuthNavigator = createStackNavigator({
  GreetingsScreen: GreetingsScreen,
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordNavigator,
  SignUp: SignUpNavigator,
},
  {
    headerMode: 'none',
    initialRouteName: 'GreetingsScreen'
  }
)

export default AuthNavigator;
