import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Image, Animated, Platform } from 'react-native';
import { Pages } from 'react-native-pages';

let imageStyle = {
  width: null,
  height: null,
  resizeMode: 'cover',
  flex: 1,
};

let viewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

let textStyle = {
  backgroundColor: 'transparent',
  textAlign: 'center',
  fontSize: 52,
};

let indexStyle = {
  fontSize: 10,
  color: 'rgba(255, 255, 255, .63)',
};

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#263238'),
})();

/* eslint-disable react/prop-types */

let Label = ({ color, backgroundColor, text, effect, index, pages, progress }) => {
  let style = { ...textStyle, color };

  switch (effect) {
    case 'skew':
      style.transform = [{
        skewX: progress.interpolate({
          inputRange: [-0.75, 0, 0.75],
          outputRange: ['45deg', '0deg', '-45deg'],
        }),
      }];
      break;

    case 'rise':
      style.transform = [{
        translateY: progress.interpolate({
          inputRange: [-0.5, 0, 0.5],
          outputRange: [50, 0, -50],
        }),
      }];

      style.opacity = progress.interpolate({
        inputRange: [-0.5, 0, 0.5],
        outputRange: [0, 1, 0],
      });
      break;

    case 'zoom':
      style.transform = [{
        scale: progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [4, 1, 0],
        }),
      }];

      style.opacity = progress.interpolate({
        inputRange: [-0.25, 0, 1],
        outputRange: [0, 1, 1],
      });
      break;

    case 'flip':
      style.transform = [{
        rotate: progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['360deg', '0deg', '-360deg'],
        }),
      }];
      break;

    case 'slide':
      style.transform = [{
        translateX: progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-100, 0, 100],
        }),
      }];
      break;
  }

  return (
    <View style={[viewStyle, { backgroundColor }]}>
      <Animated.Text style={style}>
        {text}
        {'\n'}
        <Animated.Text style={indexStyle}>{`[${index + 1} / ${pages}]`}</Animated.Text>
      </Animated.Text>
    </View>
  );
};

/* eslint-enable */

export default function init() {
  class Example extends Component {
    render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#263238' }}>
          <Pages>
            <Label color='#FFF59D' backgroundColor='#607D8B' text='move' effect='skew' />
            <Label color='#B2FF59' backgroundColor='#546E7A' text='fast' effect='rise' />
            <Label color='#81D4FA' backgroundColor='#455A64' text='and'  effect='zoom' />
            <Label color='#F44336' backgroundColor='#37474F' text='break' effect='flip' />
            <Label color='#FF9100' backgroundColor='#263238' text='things' effect='slide' />
          </Pages>

          <Pages
            horizontal={false}
            indicatorPosition='left'
            indicatorColor='#FF9100'
            indicatorOpacity={0.54}
          >
            <Image source={require('./assets/b-1.png')} style={imageStyle} />
            <Image source={require('./assets/b-2.png')} style={imageStyle} />
            <Image source={require('./assets/b-3.png')} style={imageStyle} />
          </Pages>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}
