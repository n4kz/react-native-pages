import PropTypes from 'prop-types';
import React, { PureComponent, Children } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Platform,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import Indicator from '../indicator';
import styles from './styles';

const floatEpsilon = Math.pow(2, -23);

function equal(a, b) {
  return Math.abs(a - b) <= floatEpsilon * Math.max(Math.abs(a), Math.abs(b));
}

export default class Pages extends PureComponent {
  static defaultProps = {
    pagingEnabled: true,
    nestedScrollEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 25,
    scrollsToTop: false,

    indicatorColor: 'rgb(255, 255, 255)',
    indicatorOpacity: 0.30,

    startPage: 0,

    horizontal: true,
    rtl: false,
  };

  static propTypes = {
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,

    indicatorColor: PropTypes.string,
    indicatorOpacity: PropTypes.number,
    indicatorPosition: PropTypes.oneOf([
      'none',
      'top',
      'right',
      'bottom',
      'left',
    ]),

    startPage: PropTypes.number,
    progress: PropTypes.instanceOf(Animated.Value),

    horizontal: PropTypes.bool,
    rtl: PropTypes.bool,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    onLayout: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
    onHalfway: PropTypes.func,

    renderPager: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);

    this.scrollRef = React.createRef();

    let { startPage, progress = new Animated.Value(startPage) } = this.props;

    this.progress = startPage;
    this.mounted = false;
    this.scrollState = -1;
    this.activeIndex = startPage;

    this.state = {
      layout: false,
      width: 0,
      height: 0,
      progress,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate() {
    if (-1 === this.scrollState) {
      /* Fix scroll position after layout update */
      requestAnimationFrame(() => {
        this.scrollToPage(Math.floor(this.progress), false);
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height, layout: true });
  }

  onScroll(event) {
    if (-1 === this.scrollState) {
      return;
    }

    let { horizontal } = this.props;
    let { [horizontal? 'x' : 'y']: offset } = event.nativeEvent.contentOffset;
    let { [horizontal? 'width' : 'height']: base, progress } = this.state;

    progress.setValue(this.progress = base? offset / base : 0);

    let discreteProgress = Math.round(this.progress);

    if (this.activeIndex !== discreteProgress) {
      this.onHalfway(discreteProgress);
    }

    if (1 === this.scrollState && equal(discreteProgress, this.progress)) {
      this.onScrollEnd();

      this.scrollState = -1;
    }
  }

  onScrollBeginDrag() {
    let { onScrollStart } = this.props;

    if ('function' === typeof onScrollStart) {
      onScrollStart(Math.round(this.progress));
    }

    this.scrollState = 0;
  }

  onScrollEndDrag() {
    let { horizontal } = this.props;

    /* Vertical pagination is not working on android, scroll by hands */
    if ('android' === Platform.OS && !horizontal) {
      this.scrollToPage(Math.round(this.progress));
    }

    this.scrollState = 1;
  }

  onScrollEnd() {
    let { onScrollEnd } = this.props;

    if ('function' === typeof onScrollEnd) {
      onScrollEnd(Math.round(this.progress));
    }
  }

  onHalfway(nextIndex) {
    let { onHalfway } = this.props;

    if ('function' === typeof onHalfway && nextIndex >= 0) {
      onHalfway(nextIndex, this.activeIndex);
    }

    this.activeIndex = nextIndex;
  }

  scrollToPage(page, animated = true) {
    let { horizontal } = this.props;
    let { [horizontal? 'width' : 'height']: base } = this.state;
    let { current: scroll } = this.scrollRef;

    if (animated) {
      this.scrollState = 1;
    }

    if (this.mounted && scroll) {
      scroll.scrollTo({
        [horizontal? 'x' : 'y']: page * base,
        animated,
      });
    }
  }

  isDragging() {
    return 0 === this.scrollState;
  }

  isDecelerating() {
    return 1 === this.scrollState;
  }

  renderPage(page, index) {
    let { width, height, progress } = this.state;
    let { children, horizontal, rtl } = this.props;

    let pages = Children.count(children);

    let pageStyle = (horizontal && rtl)?
      styles.rtl:
      null;

    /* Adjust progress by page index */
    progress = Animated.add(progress, -index);

    let props = {
      index,
      pages,
      progress,
      collapsable: false,
    };

    return (
      <View style={[{ width, height }, pageStyle]}>
        {React.cloneElement(page, props)}
      </View>
    );
  }

  renderPager(pager) {
    let { renderPager, horizontal, rtl } = this.props;

    if ('function' === typeof renderPager) {
      return renderPager({ horizontal, rtl, ...pager });
    }

    let { indicatorPosition } = pager;

    if ('none' === indicatorPosition) {
      return null;
    }

    let indicatorStyle = (horizontal && rtl)?
      styles.rtl:
      null;

    let style = [styles[indicatorPosition], indicatorStyle];

    return (
      <SafeAreaView style={style} pointerEvents='none'>
        <Indicator {...pager} />
      </SafeAreaView>
    );
  }

  renderPages(props) {
    let { horizontal, rtl, style, children } = this.props;
    let { [horizontal? 'width' : 'height']: base, layout } = this.state;

    if (!layout) {
      return null;
    }

    let scrollStyle = (horizontal && rtl)?
      styles.rtl:
      null;

    let contentOffset = {
      [horizontal? 'x' : 'y']: base * Math.floor(this.progress),
      [horizontal? 'y' : 'x']: 0,
    };

    return (
      <ScrollView
        {...props}
        style={[styles.container, style, scrollStyle]}
        onScroll={this.onScroll}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScrollEndDrag={this.onScrollEndDrag}
        contentOffset={contentOffset}
        ref={this.scrollRef}
      >
        {Children.map(children, this.renderPage, this)}
      </ScrollView>
    );
  }

  render() {
    let { progress } = this.state;
    let { horizontal } = this.props;
    let {
      style,
      containerStyle,
      children,
      indicatorColor,
      indicatorOpacity,
      indicatorPosition = horizontal? 'bottom' : 'right',
      ...props
    } = this.props;

    let pages = Children.count(children);

    let Pager = () => (
      this.renderPager({
        pages,
        progress,
        indicatorColor,
        indicatorOpacity,
        indicatorPosition,
      })
    );

    return (
      <View style={[styles.container, containerStyle]} onLayout={this.onLayout}>
        {this.renderPages(props)}

        <Pager />
      </View>
    );
  }
}
