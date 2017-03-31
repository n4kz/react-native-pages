import React, { PropTypes, PureComponent } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles.js';

export default class Indicator extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    index: PropTypes.instanceOf(Animated.Value).isRequired,
    horizontal: PropTypes.bool.isRequired,
  };

  render() {
    let { count, index, color, alpha, horizontal } = this.props;
    let dots = [];

    for (let i = 0; i < count; i++) {
      let mn = i - 1;
      let mx = i + 1;

      let opacity = index
        .interpolate({
          inputRange: [-1, mn, i, mx, count],
          outputRange: [alpha, alpha, 1.0, alpha, alpha],
        });

      let dotStyle = {
        opacity,
        backgroundColor: color,
      };

      dots.push(
        <Animated.View style={[styles.dot, dotStyle]} key={i} />
      );
    }

    let flexDirection = horizontal? 'row' : 'column';

    return (
      <View style={[styles.container, { flexDirection }]}>
        {dots}
      </View>
    );
  }
}
