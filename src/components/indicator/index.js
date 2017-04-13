import React, { PropTypes, PureComponent } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles.js';

export default class Indicator extends PureComponent {
  static propTypes = {
    pages: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    alpha: PropTypes.number.isRequired,
    progress: PropTypes.instanceOf(Animated.Value).isRequired,
    horizontal: PropTypes.bool.isRequired,
  };

  render() {
    let { pages, color, alpha, progress, horizontal } = this.props;
    let dots = [];

    for (let i = 0; i < pages; i++) {
      let mn = i - 1;
      let mx = i + 1;

      let opacity = progress
        .interpolate({
          inputRange: [-1, mn, i, mx, pages],
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
