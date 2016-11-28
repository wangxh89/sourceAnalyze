import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Svg,{
    G,
    Path,
    Line
} from 'react-native-svg';
import CommonLinkRow from '../component/CommonLinkRow';
import MyBalance from './MyBalance';
import MyBill from './MyBill';
import Setting from './Setting';
import commstyles from '../styles/style';

var Dimensions = require('Dimensions');

class MyProfile extends Component {
	constructor(props) {
		super(props);
	}

    _openBalanceDetail() {
		this.props.navigator.push({
			title: 'My Balance',
			component: MyBalance,
            id: 'myBalance'
		})
    }

    _openBill() {
		this.props.navigator.push({
			title: 'My Bill',
			component: MyBill,
            id: 'myBill'
		})
    }

    _openSetting() {
		this.props.navigator.push({
			title: 'Setting',
			component: Setting,
            id: 'setting'
		})
    }
    
	render() {
        var lineWidth = Dimensions.get('window').width;
        console.log(lineWidth);
		return (
            <View style={styles.main_view}>
                <View style={styles.tbl_row_header}>
                    <TouchableOpacity onPress={this._openBalanceDetail.bind(this)}>
                        <View style={{backgroundColor:'#fff',height:40}}>
                        <CommonLinkRow textTitle='My Balance' headerImg={require('../../img/balance.png')} 
                            linkImg={require('../../img/arrow_right.png')}/>
                        </View>
                        
                    </TouchableOpacity>
                    <Svg height='1' width={lineWidth}>
                        <Line x1="8" y1="0" x2={lineWidth-28} y2="0" stroke="#e3e3e3" strokeWidth="2" strokeDasharray="2,1"/>
                    </Svg> 
                    <View style={{height:150}}>
                        <Text style={[commstyles.common_row_title,{marginLeft:8,marginTop:14,fontSize:12}]}>Currency balance</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',
                                marginLeft:8,marginRight:8,marginTop:14}}>
                            <Text style={{color:'#ffba00',fontSize:18,fontWeight:'600'}}>$ 999.99</Text>
                            <TouchableOpacity>
                                <View style={{backgroundColor:'#32bff4',borderRadius:2,
                                justifyContent: 'center',alignItems: 'center',width:82,height:26}}>
                                    <Text style={{color:'#fff',fontSize:18}}>Top Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',marginTop:24,}}>
                            <View style={{flex:0.5,paddingLeft:8}}>
                                <Text style={{color:'#4c4c4c',fontSize:12}}>My Data(Wi-Fi)</Text>
                                <Text style={{color:'#32bff4',fontSize:16,marginTop:10}}>0.97MB</Text>
                            </View>

                            <Svg height={66} width='1'>
                                <Line x1="0" y1="6" x2="0" y2="44" stroke="#e3e3e3" strokeWidth="2" strokeDasharray="2,1"/>
                            </Svg> 

                            <View style={{flex:0.5,paddingLeft:28}}>
                                <Text style={{color:'#4c4c4c',fontSize:12}}>My Duration(Wi-Fi)</Text>
                                <Text style={{color:'#32bff4',fontSize:16,marginTop:10}}>00:38:53</Text>
                            </View>
                        </View>
                    </View>
                </View>

                
                <TouchableOpacity onPress={this._openBill.bind(this)}>
                <View style={styles.tbl_row}>
                    <CommonLinkRow textTitle='My Bill' headerImg={require('../../img/bill.png')} 
                            linkImg={require('../../img/arrow_right.png')}/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._openSetting.bind(this)}>
                <View style={styles.tbl_row}>
                    <CommonLinkRow textTitle='Setting' headerImg={require('../../img/setting.png')} 
                            linkImg={require('../../img/arrow_right.png')}/>
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
    tbl_row_header: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent:'flex-start',
        marginTop: 10,
        marginLeft:10,
        marginRight:10,
        height: 200
    },
    tbl_row: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginLeft:10,
        marginRight:10,
        height: 40
    },
    img_view: {
        marginLeft:10,
        marginRight:10
    }
});

export default MyProfile;