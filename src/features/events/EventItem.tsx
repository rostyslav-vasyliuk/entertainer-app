import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const EventItem = (props) => {
  return (
    <View style={styles.tileWrapper}>
      <Text>
        FF
      </Text>
    </View>
  )
}

export default EventItem;

const styles = StyleSheet.create({
  tileWrapper: {
    height: 120,
    width: 150,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5
  }
})
