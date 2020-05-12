import { Animated, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
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
import { Axios } from '../../../api/instance';
import { AxiosResponse } from 'axios';
import { LOADER_COLOR } from '../../../constants/color-constants';

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
  const [isLoading, setIsLoading] = useState(false);
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
    const token = props.navigation.getParam('forgot-password-token', null);
    const email = props.navigation.getParam('email', null);
    setIsLoading(true);

    Axios.post('/auth/confirm-code', { email, code: value }, { headers: { 'forgot-password-token': token } })
      .then((response: AxiosResponse) => {
        const resetToken = response.headers['reset-password-token']
        setIsLoading(false);
        props.navigation.push('NewPasswordComponent', {
          email,
          'reset-password-token': resetToken
        });
      }).catch(() => {
        setIsLoading(false);
      })
  }

  const startAgain = () => {
    props.navigation.navigate('Login');
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

  if (!timeRemaining) {
    return (
      <View style={styles.root}>
        <View style={{ height: '20%', width: screenWidth, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../../../assets/lottie/timer_white.json')}
            autoPlay
            loop={true}
          />
        </View>

        <Text style={styles.subTitle}>
          {'Time is out!'}
        </Text>

        <Text style={styles.timerHeader}>
          {'Seems like you havent entered code in needed time. Be aware your code is available only for 60 seconds. You can start again, we will send you another confirmation code to your email address.'}
        </Text>

        <Button
          // disabled={isButtonDisabled}
          full
          style={styles.button}
          onPress={startAgain}
        // onPress={() => setValue('')}
        >
          <Text style={styles.buttonsLabel}>
            {'Start again'}
          </Text>
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ height: '20%', width: screenWidth, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
        <LottieView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          source={require('../../../assets/lottie/envelope.json')}
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
      <Button
        // disabled={isButtonDisabled}
        full
        style={styles.button}
        onPress={toNextScreen}
      // onPress={() => setValue('')}
      >
        {!isLoading ? (
          <Text style={styles.buttonsLabel}>
            {'Continue'}
          </Text>
        ) : (
            <ActivityIndicator color={LOADER_COLOR} />
          )}
      </Button>
    </SafeAreaView>
  );
};

export default AnimatedExample;
