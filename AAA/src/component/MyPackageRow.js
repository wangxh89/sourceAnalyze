import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    Image
} from 'react-native';
import Svg,{
    G,
    Path,
    Line
} from 'react-native-svg';
import CommonLinkRow from './CommonLinkRow';
var Dimensions = require('Dimensions');

class MyPackageRow extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
        let {balanceName,effDate,expDate} = this.props.balanceData;
        let lineWidth = Dimensions.get('window').width;
        
		return (
            <View style={styles.main_view}>
                <View style={styles.header_view}>
                    <Text style={styles.name_text}>
                        {balanceName}
                    </Text>
                </View>
                    
                <Svg height='1' width={lineWidth}>
                    <Line x1="8" y1="0" x2={lineWidth-28} y2="0" stroke="#e3e3e3" strokeWidth="2" strokeDasharray="2,1"/>
                </Svg> 
                <View style={styles.content_view}>
                    <View style={styles.date_view}>
                        <Text style={styles.date_text}>Effective Date</Text>
                        <Text style={styles.date_text}>{effDate}</Text>
                    </View>

                    <View style={styles.date_view}>
                        <Text style={styles.date_text}>Expire Date</Text>
                        <Text style={styles.date_text}>{expDate}</Text>
                    </View>
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
        justifyContent: 'center',
        flex: 1
    },
    name_text: {
        marginLeft: 8,
        color: '#4c4c4c',
        fontSize: 12
    },
    content_view: {
        backgroundColor:'#fff',
        justifyContent: 'center',
        flex: 1.5
    },
    date_view: {
        flex:1,
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 9,
        marginRight: 8
    },
    date_text: {
        color: '#909090',
        fontSize: 12,
    },
});

export default MyPackageRow;