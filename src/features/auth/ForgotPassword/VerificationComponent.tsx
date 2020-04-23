// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
// import { Button, Header, Left, Body, Right, Text } from 'native-base';
// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from 'react-native-confirmation-code-field';

// const CELL_COUNT = 6;

// const VerificationComponent = (props) => {
//   const [email, setEmail] = useState('');
//   // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [value, setValue] = useState('');
//   const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
//   const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   const goBack = () => {
//     props.navigation.goBack();
//   }

//   useEffect(() => {
//     const email = props.navigation.getParam('email', null);
//     setEmail(email);
//   }, [])

//   const toNextScreen = () => {
//     props.navigation.push('GreetingsScreen');
//   }

//   return (
//     <View>
//       <Header transparent>
//         <Left>
//           <Button transparent onPress={goBack}>
//             {/* <AntDesign name='arrowleft' size={30} /> */}
//           </Button>
//         </Left>
//         <Body>
//           {/* <Title>Sign Up</Title> */}
//         </Body>
//         <Right />
//       </Header>
//       <View style={styles.contentWrapper}>
//         <Text>
//           Recover
//         </Text>
//       </View>
//       <SafeAreaView style={styles.root}>
//       <Text style={styles.title}>Verification</Text>
//       <CodeField
//         ref={ref}
//         {...props}
//         value={value}
//         onChangeText={setValue}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFiledRoot}
//         keyboardType="number-pad"
//         renderCell={({index, symbol, isFocused}) => (
//           <Text
//             key={index}
//             style={[styles.cell, isFocused && styles.focusCell]}
//             onLayout={getCellOnLayoutHandler(index)}>
//             {symbol || (isFocused ? <Cursor /> : null)}
//           </Text>
//         )}
//       />
//     </SafeAreaView>
//     </View>
//   );
// }


// export default VerificationComponent;

// const styles = StyleSheet.create({
//   contentWrapper: {
//     height: '100%'
//   },
//   button: {
//     width: '90%',
//     marginLeft: '5%',
//     marginRight: '5%',
//     height: 50,
//     borderRadius: 5,
//     backgroundColor: '#fe4b66'
//   },
//   buttonDisabled: {
//     backgroundColor: '#ccc'
//   },
//   inputWrapper: {
//     width: '90%',
//     marginLeft: '5%',
//     marginRight: '5%',
//     paddingBottom: 10
//   },
//   viewTitle: {
//     padding: 20,
//     paddingTop: 10,
//     paddingBottom: 0,
//     fontSize: 23,
//     fontWeight: '600',
//     textAlign: 'center'
//   },
//   viewHeader: {
//     padding: 20,
//     paddingTop: 10,
//     paddingBottom: 0,
//     fontSize: 22,
//     fontWeight: '500',
//     textAlign: 'center'
//   },
//   viewDescription: {
//     padding: 35,
//     paddingTop: 10,
//     paddingBottom: 20,
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#595959'
//   },
//   borderStyleBase: {
//     width: 30,
//     height: 45
//   },

//   borderStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },

//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//   },

//   underlineStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },
//   root: {flex: 1, padding: 20},
//   title: {textAlign: 'center', fontSize: 30},
//   codeFiledRoot: {marginTop: 20},
//   cell: {
//     width: 40,
//     height: 40,
//     lineHeight: 38,
//     fontSize: 24,
//     borderWidth: 2,
//     borderColor: '#00000030',
//     textAlign: 'center',
//   },
//   focusCell: {
//     borderColor: '#000',
//   },
// })

/*
Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments
*/
import { Animated, Image, SafeAreaView, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'native-base';
import LottieView from 'lottie-react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import { screenWidth } from '../../../constants/screen-contants';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const AnimatedExample = (props) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    timeRemaining > 0 && setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);

    if (timeRemaining === 0) {
      setTimeRemaining(null);
    }
  }, [timeRemaining]);

  const toNextScreen = () => {
    props.navigation.push('NewPasswordComponent');
  }

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* <Text style={styles.title}>Check your email</Text> */}
      <View style={{ height: '20%', width: screenWidth, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
        <LottieView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          source={require('../../../assets/envelope.json')}
          autoPlay
          loop={true}
        />
      </View>
      <Text style={styles.subTitle}>
        {'Enter confirmation code'}
      </Text>

      <Text style={styles.timerHeader}>
        We've sent you an email with verification code. Put it down here to recover your password.
      </Text>
      <Text style={styles.timer}>
        It will be valid for next <Text style={styles.remaining}>{timeRemaining}</Text> seconds
      </Text>

      <CodeField
        ref={ref}
        {...properties}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={renderCell}
      />
      {/* <View style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Verify</Text>
      </View> */}
      <Button
        // disabled={isButtonDisabled}
        full
        style={styles.button}
        onPress={toNextScreen}
        // onPress={() => setValue('')}
      >
        <Text style={styles.buttonsLabel}>
          {'Next'}
        </Text>
      </Button>
    </SafeAreaView>
  );
};

export default AnimatedExample;
