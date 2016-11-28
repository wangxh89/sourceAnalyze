import React, { Component } from 'react';
import {
    Platform,
	View,
	Text,
    StyleSheet,
    TouchableOpacity,
    Image,
	Switch
} from 'react-native';
import Swiper from 'react-native-swiper';
import commstyles from '../styles/style';

var Dimensions = require('Dimensions');
var winWidth = Dimensions.get('window').width;
var winHeight = Dimensions.get('window').height;

class HomePage extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
		let dataHeight = winHeight - (Platform.OS === 'android' ? 66 : 64) - winWidth*5/9 - 42 - 48;
		return (
			<View style={styles.main_view}>
				<Image source={require('../../img/header.png')} style={styles.img_view}/>
				
				<View style={styles.wifi_view}>
					<View style={styles.row_node}>
						<Image source={require('../../img/staff.png')} style={styles.wifi_left}/>
						<Text style={[styles.wifi_left,styles.wifi_text]}>1333844343</Text>
					</View>

					<View style={styles.row_node}>
						<Image source={require('../../img/wifi.png')} style={styles.wifi_right}/>
						<Switch  style={[styles.wifi_right,commstyles.switch_button]}/>
					</View>
				</View>
				
				<Swiper style={styles.wrapper} showsButtons={false} autoplay={true} width={winWidth} height={dataHeight}>
				<View style={styles.data_view}>
					<Image source={require('../../img/progress.png')} style={styles.data_img}/>
					<Text style={styles.data_state}>Remained</Text>
					<View style={styles.data_real_view}>
						<Text style={styles.data_data}>0.97</Text><Text style={styles.data_unit}>MB</Text>
					</View>
					<Text style={styles.data_total}>Total Data:0.98MB</Text>
					<Text style={styles.data_text}>Data(Wi-Fi)</Text>
				</View>
								<View style={styles.data_view}>
					<Image source={require('../../img/progress.png')} style={styles.data_img}/>
					<Text style={styles.data_state}>Remained</Text>
					<View style={styles.data_real_view}>
						<Text style={styles.data_data}>0.97</Text><Text style={styles.data_unit}>MB</Text>
					</View>
					<Text style={styles.data_total}>Total Data:0.98MB</Text>
					<Text style={styles.data_text}>Data(Wi-Fi)</Text>
				</View>
								<View style={styles.data_view}>
					<Image source={require('../../img/progress.png')} style={styles.data_img}/>
					<Text style={styles.data_state}>Remained</Text>
					<View style={styles.data_real_view}>
						<Text style={styles.data_data}>0.97</Text><Text style={styles.data_unit}>MB</Text>
					</View>
					<Text style={styles.data_total}>Total Data:0.98MB</Text>
					<Text style={styles.data_text}>Data(Wi-Fi)</Text>
				</View>
				</Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1
    },
	img_view: {
		 width: winWidth,
		 height: winWidth*5/9
	},
    wifi_view: {
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ececec'
    },
    row_node: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wifi_left: {
        marginLeft: 12
    },
	wifi_text: {
		fontSize: 14,
		color: '#909090'
	},
    wifi_right: {
        marginRight: 12
    },
    data_view: {
        alignItems: 'center',
		flex:1,
    },
	data_img: {
		marginTop: 18
	},
	data_state: {
		marginTop: -118,
		color: '#909090',
		fontSize: 12
	},
	data_real_view:{
        flexDirection: 'row',
		marginTop: 3,
		marginBottom: 3,
		alignItems: 'center'
	},
	data_data: {
		color: '#feba00',
		fontSize: 24
	},
	data_unit: {
		color: '#909090',
		fontSize: 12
	},
	data_total: {
		color: '#909090',
		fontSize: 12
	},
	data_text: {
		marginTop: 98,
		color: '#909090',
		fontSize: 14
	},
	wrapper: {
		
	},

});

export default HomePage;