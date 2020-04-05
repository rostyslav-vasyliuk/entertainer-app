import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';

const TabHeaderLabel = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        {props.text}
      </Text>
      <Icon name={props.icon} style={styles.icon} />
    </View>
  )
}

export default TabHeaderLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
    paddingRight: 6
  },
  wrapper: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // alignContent: 'center'
  },
  icon: {
    fontSize: 20,
    paddingTop: 2
  }
})
