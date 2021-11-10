import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { screenWidth } from '../../constants/screen-contants';
import { Icon } from 'native-base';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];

const gradientColors = 2 % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

const AttentionCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          {'Pay Attention'}
        </Text>
        <Icon name='ios-close' style={styles.closeIcon}/>
      </View>

      <Gradient
          start={[0.45, 0.45]}
          end={[0.90, 0.90]}
          colors={gradientColors}
          style={styles.gradient}
        >
          <Icon name='ios-add-circle' color='white' style={{color: 'white'}}/>
        </Gradient>
    </View>
  );
}

export default AttentionCard;
const BASE_SIZE= 16;
const styles = StyleSheet.create({
  wrapper: {
    height: 100,
    margin: 8,
    width: screenWidth - 16,
    borderRadius: 5,
    borderWidth: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerLabel: {
    fontSize: 16,
    fontWeight: '500'
  },
  closeIcon: {
    fontSize: 36,
    padding: 10,
    paddingTop: 0
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
