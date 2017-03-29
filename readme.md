[npm-badge]: https://img.shields.io/npm/v/react-native-pages.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-pages
[license-badge]: https://img.shields.io/npm/l/react-native-pages.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-pages/master/license.txt

# react-native-pages

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Easy to use page view component for React Native

## Features

* Easy to use 
* Consistent look and feel on iOS and Android
* Landscape and portrait orientation support
* Animated page indicator
* Pure javascript implementation

## Roadmap

### 0.1.0

* Configurable page indicator position
* Page change callback
* Example
* Documentation

### 0.2.0

* Parallax support
* Customizable page indicator

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
-------------------- | ----------------------------------------- | --------:| ------------------
indicatorColor       | Page indicator color                      |   String | rgb(255, 255, 255)
indicatorOpacity     | Page indicator opacity (inactive dots)    |   String | 0.30
horizontal           | Scroll direction                          |  Boolean | true

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
