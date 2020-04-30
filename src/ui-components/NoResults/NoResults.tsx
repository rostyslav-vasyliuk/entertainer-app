import React from 'react';
import { View, Text } from 'react-native';
import { TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../../constants/color-constants';
import LottieView from 'lottie-react-native';

const NoResults = () => {
  return (
    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: '35%', display: 'flex', justifyContent: 'center' }}>
        <LottieView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          source={require('../../assets/cubic-loader.json')}
          autoPlay
          loop={true}
        />
      </View>
      <Text style={{ color: TEXT_COLOR, fontSize: 18, fontWeight: '600' }}>
        {'No results found!'}
      </Text>
      <Text style={{ color: TEXT_COLOR_SECONDARY, fontSize: 14, fontWeight: '500', paddingLeft: 40, paddingRight: 40, textAlign: 'center', paddingTop: 8 }}>
        {'Seems like we have nothing to show you related to your request'}
      </Text>
    </View>
  )
}

export default NoResults;
