import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rtl: {
    transform: [{
      rotate: '180deg',
    }],
  },

  container: {
    flex: 1,
  },

  bottom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },

  top: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },

  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },

  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

});
