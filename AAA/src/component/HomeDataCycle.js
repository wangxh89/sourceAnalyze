import React, { Component } from 'react';
import {
    Platform,
	View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

class SvgExample extends Component {
    render() {
        return (
            <Svg
                height="200"
                width="200"
            >
                <Circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#e0e0e0"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="3,1.6"
                />
                <Circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#42c4f5"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="3,1.6"
                />
                <Circle
                    cx="100"
                    cy="100"
                    r="68"
                    stroke="#b6b6b6"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="1,1"
                />
            </Svg>
        );
    }
}

export default SvgExample;