import React, { PropTypes, Component } from 'react';
import { View, ScrollView, Animated } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class Swiper extends Component {
  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 32,

    indicatorColor: 'rgb(255, 255, 255)',
    indicatorOpacity: 0.30,
  };

  static propTypes = {
    ...ScrollView.propTypes,

    indicatorColor: PropTypes.string,
    indicatorOpacity: PropTypes.number,
    indicatorPosition: PropTypes.oneOf([
      'none',
      'top',
      'right',
      'bottom',
      'left',
    ]),

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.progress = 0;

    this.state = {
      width: 0,
      height: 0,
      progress: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    let { horizontal } = this.props;
    let { [horizontal? 'width' : 'height']: base } = this.state;

    /* Fix scroll position after layout update */
    this.refs.scroll.scrollTo({
      [horizontal? 'x' : 'y']: Math.floor(this.progress) * base,
      animated: false,
    });
  }

  onLayout(event) {
    let { width, height } = event.nativeEvent.layout;

    this.setState({ width, height });
  }

  onScroll(event) {
    let { horizontal } = this.props;
    let { [horizontal? 'x' : 'y']: offset } = event.nativeEvent.contentOffset;
    let { [horizontal? 'width' : 'height']: base, progress } = this.state;

    progress.setValue(this.progress = base? offset / base : 0);
  }

  renderPager(pager) {
    let {
      pages,
      progress,
      indicatorColor,
      indicatorOpacity,
      indicatorPosition,
    } = pager;

    if ('none' === indicatorPosition) {
      return null;
    }

    let horizontal = /^(top|bottom)$/
      .test(indicatorPosition);

    return (
      <View style={styles[indicatorPosition]}>
        <Indicator
          index={progress}
          count={pages.length}
          color={indicatorColor}
          alpha={indicatorOpacity}
          horizontal={horizontal}
        />
      </View>
    );
  }

  render() {
    let { width, height, progress } = this.state;
    let { horizontal } = this.props;
    let {
      children = [],
      indicatorColor,
      indicatorOpacity,
      indicatorPosition = horizontal? 'bottom' : 'right',
      ...props
    } = this.props;

    let pages = [].concat(children)
      .map((child, key) => {
        return (
          <View style={{ width, height }} key={key}>
            {child}
          </View>
        );
      });

    let Pager = () =>
      this.renderPager({
        pages,
        progress,
        indicatorColor,
        indicatorOpacity,
        indicatorPosition,
      });

    return (
      <View style={styles.container}>
        <ScrollView
          {...props}
          onLayout={this.onLayout}
          onScroll={this.onScroll}
          ref='scroll'
        >
          {pages}
        </ScrollView>

        <Pager />
      </View>
    );
  }
}
