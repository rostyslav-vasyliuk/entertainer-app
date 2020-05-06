import React, { useEffect } from 'react';
import AppNavigator from './navigation';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { changeNetworkState } from './features/profile/actions';
import { Text, View } from 'react-native';
import { Button } from 'native-base';
import { screenWidth } from './constants/screen-contants';
import LottieView from 'lottie-react-native';
import { TEXT_COLOR, BACKGROUND_LIGHT, BUTTON_COLOR } from './constants/color-constants';
import i18n from './i18n';

const AppContainer = (props) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (props.isConnected !== state.isConnected) {
      props.changeNetworkState(state.isConnected);
    }
  });

  useEffect(() => {
    console.disableYellowBox = true;
    i18n.changeLanguage(props.language);
    return () => {
      unsubscribe();
    }
  }, []);

  const getNetworkMessage = () => {
    return (
      <View style={{ height: '100%', width: screenWidth, backgroundColor: BACKGROUND_LIGHT, position: 'absolute', zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          style={{
            width: '100%',
            height: 220,
            backgroundColor: 'transparent',
          }}
          source={require('./assets/lottie/connection.json')}
          autoPlay
          loop={true}
        />
        <Text style={{ color: TEXT_COLOR, marginTop: 40, fontSize: 16, letterSpacing: 1.01, fontWeight: '500' }}>
          {'No internet connection found!'}
        </Text>
        <Text style={{ color: TEXT_COLOR, marginTop: 5, fontSize: 16, letterSpacing: 1.01, fontWeight: '500' }}>
          {'Check your connection and try again'}
        </Text>
        <Button full style={{ marginRight: 70, marginLeft: 70, backgroundColor: BUTTON_COLOR, marginTop: 25, borderRadius: 5 }}>
          <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: '600' }}>
            {'Try again'}
          </Text>
        </Button>
      </View>
    )
  }

  return (
    <>
      {props.isConnected === false && getNetworkMessage()}
      <AppNavigator />
    </>
  );
}

const mapStateToProps: (state) => any = (state) => ({
  isConnected: state.profile.isConnected,
  language: state.profile.language
});

const mapDispatchToProps = (dispatch) => ({
  changeNetworkState: (isConnected: boolean) => {
    dispatch(changeNetworkState(isConnected))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
