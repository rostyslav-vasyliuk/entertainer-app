import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import store from './store/store';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome, Entypo, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Root } from 'native-base';
import { Asset } from 'expo-asset';
import { assets } from './constants/images-assets';
import * as Sentry from 'sentry-expo';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false)

  const _cacheResourcesAsync = async () => {
    const fontAssets = cacheFonts(
      [FontAwesome.font, Entypo.font, AntDesign.font, Ionicons.font, MaterialIcons.font, MaterialCommunityIcons.font]
    );

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    const imagesAssets = cacheImages([...assets]);

    await Promise.all([...fontAssets, ...imagesAssets]);
  }

  const cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font));
  }

  const cacheImages = (images) => {
    return images.map(image => Asset.loadAsync(image));
  }

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Root>
        <StatusBar barStyle='light-content' />
        <View style={styles.container}>
          <AppContainer />
        </View>
      </Root>
    </Provider>
  );
}

export default App;

Sentry.init({
  dsn: 'https://1b26ecdb38894b6a91e1bbbaf1c37b05@o390539.ingest.sentry.io/5234006',
  enableInExpoDevelopment: true,
  debug: true,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17191c',
  },
});
