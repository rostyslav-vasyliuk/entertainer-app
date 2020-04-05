import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { screenWidth } from '../../constants/screen-contants';

type Props = {
  amount: number;
  activeIndex: number;
}

const Stepper = (props: Props) => {
  const { amount, activeIndex } = props;
  const array = Array.from({ length: amount }, (v, i) => i + 1);

  return (
    <View></View>
    // <View style={styles.container}>
    //   {array.map((element: number, index: number) => (
    //     <>
    //       <View style={index <= activeIndex ? styles.activeCircle : styles.circle}>
    //         <Text style={styles.circleText}>
    //           {element}
    //         </Text>
    //       </View>
    //       {index !== array.length - 1 && (
    //         <View style={index < activeIndex ? styles.activeDivider : styles.divider} />)
    //       }
    //     </>
    //   ))}
    // </View>
  )
}

export default Stepper;

const dividerWidth = (screenWidth - 30 * 4) / 4;

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  circle: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    borderRadius: 50,
    backgroundColor: 'gray'
  },
  activeCircle: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    borderRadius: 50,
    backgroundColor: '#fe4b66'
  },
  circleText: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    height: 2,
    width: dividerWidth,
    backgroundColor: 'gray'
  },
  activeDivider: {
    height: 2,
    width: dividerWidth,
    backgroundColor: '#fe4b66'
  },
  wrapper: {
    height: 5,
    backgroundColor: 'gray'
  }
})