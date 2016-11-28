import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Svg,{
    G,
    Path,
    Line
} from 'react-native-svg';
import CommonLinkRow from './CommonLinkRow';
import OrderPackage from '../package/OrderPackage'

var Dimensions = require('Dimensions');

class AllPackageRow extends Component {
	constructor(props) {
		super(props);
	}

    _orderPkg() {
		this.props.navigator.push({
			title: 'Order',
			component: OrderPackage
		})
	}

	render() {
        let {balanceName,balanceData,balanceContent} = this.props.balanceData;
        let lineWidth = Dimensions.get('window').width;
        
		return (
            <View style={styles.main_view}>
                <View style={styles.header_view}>
                    <View style={styles.name_view}>
                        <Text style={styles.name_text}>
                            {balanceName}
                        </Text>
                    </View>

                    <View style={styles.data_view}>
                        <Text style={styles.data_text}>{balanceData}</Text>
                        <TouchableOpacity onPress={this._orderPkg.bind(this)}>
                        <View style={styles.order_view}>
                            <Text style={styles.order_text}>Order</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
                    
                <Svg height='1' width={lineWidth}>
                    <Line x1="8" y1="0" x2={lineWidth-28} y2="0" stroke="#e3e3e3" strokeWidth="2" strokeDasharray="2,1"/>
                </Svg> 
                <View style={styles.content_view}>
                    <Text style={styles.content_text}>{balanceContent}</Text>
                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor:'#fff'
    },
    header_view: {
        height:80
    },
    name_view: {
        flex:1,
    },
    name_text: {
        marginLeft: 8,
        marginTop: 12,
        color: '#4c4c4c',
        fontSize: 12
    },
    data_view: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    data_text: {
        marginLeft: 8,
        color: '#ffba00',
        fontSize: 18,
        fontWeight:'600'
    },
    order_view: {
        marginRight:8,
        backgroundColor:'#32bff4',
        borderRadius:2,
        justifyContent: 'center',
        alignItems: 'center',
        width:80,
        height:28,
        borderWidth:0.5,
        borderColor: '#18a6db'
    },
    order_text: {
        color:'#fff',
        fontSize:14,
        fontWeight:'600'
    },
    content_view: {
        backgroundColor:'#fff',
        justifyContent: 'space-around',
    },
    content_text: {
        fontSize: 12,
        color: '#909090',
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 14,
        marginTop : 10,
        lineHeight: 20
    },
});

export default AllPackageRow;