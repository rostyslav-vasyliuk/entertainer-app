
import { createStackNavigator } from 'react-navigation-stack';
import EnterEmailComponent from '../features/auth/ForgotPassword/EnterEmailComponent';
import VerificationComponent from '../features/auth/ForgotPassword/VerificationComponent';
import NewPasswordComponent from '../features/auth/ForgotPassword/NewPasswordComponent';

const ForgotPasswordNavigator = createStackNavigator({
  EnterEmailComponent: {
    screen: EnterEmailComponent
  },
  VerificationComponent: {
    screen: VerificationComponent
  },
  NewPasswordComponent: {
    screen: NewPasswordComponent
  }
},
  {
    headerMode: 'none',
    initialRouteName: 'EnterEmailComponent'
  }
)

export default ForgotPasswordNavigator;
