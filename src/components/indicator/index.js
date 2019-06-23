import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {View, Animated, ViewPropTypes} from 'react-native';

import styles from './styles';

export default class Indicator extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,

    pages: PropTypes.number.isRequired,
    progress: PropTypes.instanceOf(Animated.Value).isRequired,
    indicatorColor: PropTypes.string.isRequired,
    indicatorOpacity: PropTypes.number.isRequired,
    indicatorPosition: PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left',
      'topRight',
      'topLeft',
      'bottomRight',
      'bottomLeft',
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
      ...props
    } = this.props;

    let dots = Array.from(new Array(pages), (page, index) => {
      let opacity = progress
        .interpolate({
          inputRange: [
            -Infinity,
            index - 1,
            index,
            index + 1,
            Infinity,
          ],
          outputRange: [
            indicatorOpacity,
            indicatorOpacity,
            1.0,
            indicatorOpacity,
            indicatorOpacity,
          ],
        });

      let style = {opacity, backgroundColor};

      return (
        <Animated.View style={[styles.dot, style]} key={index}/>
      );
    });

    let flexDirection = /^(top|bottom)$/
      .test(indicatorPosition) ?
      'row' :
      'column';

    return (
      <View style={[styles.container, {flexDirection}, style]} {...props}>
        {dots}
      </View>
    );
  }
}
