import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {BackgroundGradient} from './components/BackgroundGradient';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEIGHT = 256;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_WIDTH = WIDTH - 5;
const CARD_HEIGHT = HEIGHT - 5;

const App = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(event => {
      x.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP),
      );
      y.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP),
      );
    })
    .onUpdate(event => {
      x.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP,
      );
      y.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      x.value = withTiming(0);
      y.value = withTiming(0);
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotateX = `${x.value}deg`;
    const rotateY = `${y.value}deg`;

    return {
      transform: [
        {
          perspective: 300,
        },
        {
          rotateX,
        },
        {
          rotateY,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              position: 'absolute',
              backgroundColor: 'black',
              borderRadius: 20,
              zIndex: 300,
            },
            cardStyle,
          ]}>
          <View
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '10%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 70,
                width: 70,
                borderRadius: 40,
                backgroundColor: '#272f46',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: 10,
              }}>
              <View
                style={{
                  height: 20,
                  width: 80,
                  borderRadius: 40,
                  backgroundColor: '#272f46',
                }}
              />
              <View
                style={{
                  height: 20,
                  width: 150,
                  borderRadius: 40,
                  backgroundColor: '#272f46',
                }}
              />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
