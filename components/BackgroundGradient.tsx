import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Canvas,
  RoundedRect,
  SweepGradient,
  vec,
  BlurMask,
} from '@shopify/react-native-skia';

type BackgroundGradientProps = {
  width: number;
  height: number;
};

const canvasPadding = 40;

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(
  ({width, height}) => {
    return (
      <View style={styles.container}>
        <Canvas
          style={{
            width: width + canvasPadding,
            height: height + canvasPadding,
          }}>
          <RoundedRect
            x={canvasPadding / 2}
            y={canvasPadding / 2}
            width={width}
            height={height}
            color={'white'}
            r={20}>
            <SweepGradient
              c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
              colors={['cyan', 'magenta', 'yellow', 'cyan']}
            />
            <BlurMask blur={10} style={'solid'} />
          </RoundedRect>
        </Canvas>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
});

export {BackgroundGradient};
