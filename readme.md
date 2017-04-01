[npm-badge]: https://img.shields.io/npm/v/react-native-pages.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-pages
[license-badge]: https://img.shields.io/npm/l/react-native-pages.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-pages/master/license.txt

# react-native-pages

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Easy to use page view component for React Native

![example](https://cloud.githubusercontent.com/assets/2055622/24577964/2eb771f0-16e0-11e7-9694-a0200716dd56.gif)

## Features

* Easy to use
* Consistent look and feel on iOS and Android
* Landscape and portrait orientation support
* Configurable scroll direction
* Configurable page indicator position, color and opacity
* Animated page indicator
* Pure javascript implementation

## Roadmap

### 0.1.0

* Documentation

### 0.2.0

* Parallax support
* Custom page indicator

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
      <Pages/>
    );
  }
}
```

## Properties

name                 | description                               | type     | default
-------------------- | ----------------------------------------- | --------:| --------------------------
horizontal           | Scroll direction                          |  Boolean | true
indicatorColor       | Page indicator color                      |   String | rgb(255, 255, 255)
indicatorOpacity     | Page indicator opacity (inactive dots)    |   Number | 0.30
indicatorPosition    | Page indicator position                   |   String | horizontal? bottom : right
onScrollEnd          | Scroll end callback                       | Function | -

## Example

```bash
git clone https://github.com/n4kz/react-native-pages
cd react-native-pages/example
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
