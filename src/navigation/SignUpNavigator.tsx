
import FirstLastNameScreen from '../features/auth/SignUp/FirstLastNameScreen';
import { createStackNavigator } from 'react-navigation-stack';
import EmailScreen from '../features/auth/SignUp/EmailScreen';
import ContryScreen from '../features/auth/SignUp/CountryScreen';
import PasswordScreen from '../features/auth/SignUp/PasswordScreen';
import SignUpSuccessScreen from '../features/auth/SignUp/SignUpSuccessScreen';

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