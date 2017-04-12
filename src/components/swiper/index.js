import React, { PropTypes, PureComponent, Children } from 'react';
import { View, ScrollView, Animated, Platform } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class Swiper extends PureComponent {
  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 30,
    scrollsToTop: false,

    style: styles.container,

    indicatorColor: 'rgb(255, 255, 255)',
    indicatorOpacity: 0.30,
  };

  static propTypes = {
    ...ScrollView.propTypes,

    style: View.propTypes.style,

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

    onScrollEnd: PropTypes.func,
    renderPager: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);

    this.progress = 0;
    this.scrollState = -1;

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
    let { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onScroll(event) {
    let { horizontal } = this.props;
    let { [horizontal? 'x' : 'y']: offset } = event.nativeEvent.contentOffset;
    let { [horizontal? 'width' : 'height']: base, progress } = this.state;

    progress.setValue(this.progress = base? offset / base : 0);

    if (1 === this.scrollState && !(offset % base)) {
      this.onScrollEnd();

      this.scrollState = -1;
    }
  }

  onScrollBeginDrag() {
    this.scrollState = 0;
  }

  onScrollEndDrag() {
    let { horizontal } = this.props;

    /* Vertical pagination is not working on android, scroll by hands */
    if ('android' === Platform.OS && !horizontal) {
      let { height } = this.state;

      this.refs.scroll.scrollTo({
        y: Math.round(this.progress) * height,
        animated: true,
      });
    }

    this.scrollState = 1;
  }

  onScrollEnd() {
    let { onScrollEnd } = this.props;

    if (typeof onScrollEnd === 'function') {
      onScrollEnd();
    }
  }

  renderPager(pager) {
    let { renderPager } = this.props;

    if ('function' === typeof renderPager) {
      return renderPager(pager);
    }

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
          count={pages}
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
      style,
      children,
      indicatorColor,
      indicatorOpacity,
      indicatorPosition = horizontal? 'bottom' : 'right',
      ...props
    } = this.props;

    let pages = Children
      .map(children, (child, index) => (
        <View style={{ width, height }}>
          {React.cloneElement(child, { progress: Animated.add(progress, -index) })}
        </View>
      ));

    let Pager = () =>
      this.renderPager({
        pages: Children.count(children),
        progress,
        indicatorColor,
        indicatorOpacity,
        indicatorPosition,
      });

    return (
      <View style={style}>
        <ScrollView
          {...props}
          style={styles.container}
          onLayout={this.onLayout}
          onScroll={this.onScroll}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
          ref='scroll'
        >
          {pages}
        </ScrollView>

        <Pager />
      </View>
    );
  }
}
