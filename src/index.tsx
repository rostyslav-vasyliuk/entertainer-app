import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import store from './store/store';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Root } from 'native-base';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false)
  // const _cacheResourcesAsync = async () => {
  //   // const images = [require('./assets/snack-icon.png')];

  //   const cacheImages = images.map(image => {
  //     return Asset.fromModule(image).downloadAsync();
  //   });
  //   return Promise.all(cacheImages);
  // }
  const _cacheResourcesAsync = async () => {
    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...fontAssets]);
  }

  const cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font));
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17191c',
  },
});
