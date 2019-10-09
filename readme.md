[npm-badge]: https://img.shields.io/npm/v/react-native-pages.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-pages
[license-badge]: https://img.shields.io/npm/l/react-native-pages.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-pages/master/license.txt
[travis-badge]: https://api.travis-ci.org/n4kz/react-native-pages.svg?branch=master
[travis-url]: https://travis-ci.org/n4kz/react-native-pages?branch=master
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/n4kz/react-native-pages.svg
[codeclimate-url]: https://codeclimate.com/github/n4kz/react-native-pages
[example-source]: https://github.com/n4kz/react-native-pages/blob/master/example/app.js
[example-url]: https://cloud.githubusercontent.com/assets/2055622/25063699/68d6914e-21f4-11e7-81fe-b72d8e003530.gif
[indicator-source]: https://github.com/n4kz/react-native-pages/blob/master/src/components/indicator/index.js

# react-native-pages

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]
[![travis][travis-badge]][travis-url]
[![codeclimate][codeclimate-badge]][codeclimate-url]

Easy to use page view component for React Native

![example][example-url]

## Features

* Easy to use
* Consistent look and feel on iOS and Android
* Landscape and portrait orientation support
* Parallax and complex animation support
* Animated page indicator
* Configurable scroll direction
* Configurable page indicator position, color and opacity
* RTL support
* Pure javascript implementation

## Installation

```bash
npm install --save react-native-pages
```

## Usage

```javascript
import React, { Component } from 'react';
import { Pages } from 'react-native-pages';

class Example extends Component {
  render() {
    return (
      <Pages>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
        <View style={{ flex: 1, backgroundColor: 'green' }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </Pages>
    );
  }
}
```

## Properties

 name              | description                            | type     | default
:----------------- |:-------------------------------------- | --------:|:------------------
 horizontal        | Scroll direction                       |  Boolean | true
 rtl               | RTL mode for horizontal scroll         |  Boolean | false
 startPage         | Start page                             |   Number | 0
 indicatorColor    | Page indicator color                   |   String | rgb(255, 255, 255)
 indicatorOpacity  | Page indicator opacity (inactive dots) |   Number | 0.30
 indicatorPosition | Page indicator position                |   String | bottom
 containerStyle    | Style for container view               |   Object | -
 progress          | Animated.Value updated with progress   |   Object | -
 onScrollStart     | Scroll start callback                  | Function | -
 onScrollEnd       | Scroll end callback                    | Function | -
 onHalfway         | Dominant page change callback          | Function | -
 renderPager       | Render pager callback                  | Function | -

Possible values for `indicatorPosition` are `none`, `top`, `right`, `bottom` and `left`

## Methods

 name           | description                                       | returns
:-------------- |:------------------------------------------------- | -------:
 scrollToPage   | Scroll to page with optional animation            | -
 isDragging     | Returns whether the user has begun scrolling      | Boolean
 isDecelerating | Returns whether content is moving after scrolling | Boolean

## Replacing page indicator

```javascript
import { Indicator, Pages } from 'react-native-pages';

class Example extends Component {
  _renderPager = (options) => {
    let {
      rtl,
      pages,
      progress,
      horizontal,
      indicatorColor,
      indicatorOpacity,
      indicatorPosition,
    } = options;

    if ('none' === indicatorPosition) {
      return null;
    }

    return (
      <Indicator {...options} />
    );
  };

  render() {
    let { children, ...props } = this.props;

    return (
      <Pages {...props} renderPager={this._renderPager}>
        {children}
      </Pages>
    );
  }
}
```

For implementation details take look at [Indicator][indicator-source] component

## Parallax and other animations

All child components receive the following props

 name     | description                          | type
:-------- |:------------------------------------ | ------:
 index    | Page index                           | Number
 pages    | Page count                           | Number
 progress | Animated.Value with current progress | Object

For usage example take look at example app [source code][example-source]

## Example

```bash
git clone https://github.com/n4kz/react-native-pages
cd react-native-pages/example
npm install
npm run ios # or npm run android
```

## Copyright and License

BSD License

Copyright 2017-2019 Alexander Nazarov. All rights reserved.
