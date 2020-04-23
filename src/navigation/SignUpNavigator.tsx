
import { createStackNavigator } from 'react-navigation-stack';
import FirstLastNameScreen from '../features/auth/SignUp/FirstLastNameScreen.container';
import EmailScreen from '../features/auth/SignUp/EmailScreen.container';
import ContryScreen from '../features/auth/SignUp/CountryScreen.container';
import PasswordScreen from '../features/auth/SignUp/PasswordScreen.container';
import SignUpSuccessScreen from '../features/auth/SignUp/SignUpSuccessScreen.container';

const SignUpNavigator = createStackNavigator({
  EmailScreen: {
    screen: EmailScreen
  },
  FirstLastNameScreen: {
    screen: FirstLastNameScreen
  },
  CountryScreen: {
    screen: ContryScreen
  },
  PasswordScreen: {
    screen: PasswordScreen
  },
  SignUpSuccessScreen: {
    screen: SignUpSuccessScreen
  }
},
  {
    headerMode: 'none',
    initialRouteName: 'EmailScreen'
  }
)

export default SignUpNavigator;
