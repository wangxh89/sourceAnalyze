import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import CommonLinkRow from '../component/CommonLinkRow';

class Setting extends Component {
	constructor(props) {
		super(props);
	}

    _openPass() {
        Alert.alert(
            'Password',
            'Enter current password',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => console.log('Cancel Pressed!')},
            ],
            "plain-text"
          );
    }

    _versionUpdate() {
		this.props.navigator.push({
			
		})
    }

    _openHelp() {
		this.props.navigator.push({
			
		})
    }

    _logOut() {
		this.props.navigator.push({
			
		})
    }
    
	render() {
		return (
            <View style={styles.main_view}>
                <TouchableOpacity onPress={this._openPass.bind(this)}>
                <View style={styles.tbl_row}>
                    <CommonLinkRow textTitle='Password' 
                            linkImg={require('../../img/arrow_right.png')}/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._versionUpdate.bind(this)}>
                <View style={styles.tbl_row}>
                    <CommonLinkRow textTitle='Version Update'
                            linkImg={require('../../img/arrow_right.png')}/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._openHelp.bind(this)}>
                <View style={styles.tbl_row}>
                    <CommonLinkRow textTitle='Help'/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._logOut.bind(this)}>
                <View style={styles.tbl_row}>
                    <Text>Log Out</Text>
                </View>
                </TouchableOpacity>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    tbl_row: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft:0,
        marginRight:0,
        height: 40
    },
});

export default Setting;