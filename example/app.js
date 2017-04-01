import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Image, Text, Platform } from 'react-native';
import { Pages } from 'react-native-pages';

let imageStyle = {
  width: null,
  height: null,
  resizeMode: 'cover',
  flex: 1,
};

let viewStyle = {
  flex: 1,
  justifyContent: 'center',
};

let textStyle = {
  textAlign: 'center',
  fontSize: 52,
};

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#263238'),
})();

export default function init() {
  class Example extends Component {
    render() {
      return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#263238' }}>
          <Pages>
            <View style={[viewStyle, { backgroundColor: '#607D8B' }]}>
              <Text style={[textStyle, { color: '#FFF59D' }]}>move</Text>
            </View>

            <View style={[viewStyle, { backgroundColor: '#546E7A' }]}>
              <Text style={[textStyle, { color: '#B2FF59' }]}>fast</Text>
            </View>

            <View style={[viewStyle, { backgroundColor: '#455A64' }]}>
              <Text style={[textStyle, { color: '#81D4FA' }]}>and</Text>
            </View>

            <View style={[viewStyle, { backgroundColor: '#37474F' }]}>
              <Text style={[textStyle, { color: '#F44336' }]}>break</Text>
            </View>

            <View style={[viewStyle, { backgroundColor: '#263238' }]}>
              <Text style={[textStyle, { color: '#FF9100' }]}>things</Text>
            </View>
          </Pages>

          <Pages horizontal={false} indicatorPosition='left' indicatorColor='#FF9100' indicatorOpacity={0.54}>
            <Image source={require('./assets/b-1.png')} style={imageStyle} />
            <Image source={require('./assets/b-2.png')} style={imageStyle} />
            <Image source={require('./assets/b-3.png')} style={imageStyle} />
          </Pages>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}
