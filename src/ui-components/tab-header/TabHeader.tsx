import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import { TEXT_COLOR } from '../../constants/color-constants';

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
    color: TEXT_COLOR,
    fontSize: 16,
    letterSpacing: 1.1,
    fontWeight: '600',
    overflow: 'visible',
    paddingRight: 6
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 80,
    width:200
  },
  icon: {
    fontSize: 20,
    paddingTop: 2,
    color: TEXT_COLOR

  }
})
