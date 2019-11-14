import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, ViewPropTypes } from 'react-native';

import styles from './styles';

export default class Indicator extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,

    pages: PropTypes.number.isRequired,
    progress: PropTypes.instanceOf(Animated.Value).isRequired,
    dotStyle: ViewPropTypes.style,
    indicatorColor: PropTypes.string.isRequired,
    indicatorOpacity: PropTypes.number.isRequired,
    indicatorPosition: PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left',
    ]).isRequired,
  };

  render() {
    let {
      pages,
      progress,
      indicatorColor: backgroundColor,
      indicatorOpacity,
      indicatorPosition,
      style,
      dotStyle,
      ...props
    } = this.props;

    let dots = Array.from(new Array(pages), (page, index) => {
      let opacity = progress
        .interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [indicatorOpacity, 1.0, indicatorOpacity],
          extrapolate: 'clamp',
        });

      let style = { opacity, backgroundColor, ...dotStyle };

      return (
        <Animated.View style={[styles.dot, style]} key={index} />
      );
    });

    let flexDirection = /^(top|bottom)$/
      .test(indicatorPosition)? 'row' : 'column';

    return (
      <View style={[styles.container, { flexDirection }, style]} {...props}>
        {dots}
      </View>
    );
  }
}
