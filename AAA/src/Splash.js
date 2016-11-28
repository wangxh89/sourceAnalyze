import React, { Component } from 'react';
import {
	View,
	Text,
    Image,
	TouchableOpacity
} from 'react-native';

class Splash extends Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
				<Text>Splash Page</Text>

				<TouchableOpacity>
					<Text style={{ color: '#55ACEE' }}>Open New Page</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Splash;