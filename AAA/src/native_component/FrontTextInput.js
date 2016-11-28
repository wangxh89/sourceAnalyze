import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

var RCTFrontTextInput = requireNativeComponent('RCTFrontTextInput', FrontTextInput);

export default class FrontTextInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string
  };
  render() {
    return <RCTFrontTextInput {...this.props} />;
  }
}