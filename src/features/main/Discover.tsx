import React, { useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NetInfo from '@react-native-community/netinfo';
import { debounce } from 'lodash';
import { SafeAreaView } from 'react-navigation';

class Component extends React.Component {
  static navigationOptions = {
    title: 'Discover'
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>

      </SafeAreaView>
    )
  }
}

export default Component;
