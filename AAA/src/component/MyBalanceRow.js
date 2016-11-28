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

class MyBalanceRow extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
        let balanceName = this.props.balanceName,
            headerImg = this.props.headerImg,
            {remainedData,usedData,effDate,expDate} = this.props.balanceData;
        let lineWidth = Dimensions.get('window').width;
        
		return (
            <View style={styles.main_view}>
                <View style={styles.header_view}>
                    <CommonLinkRow textTitle={balanceName} headerImg={headerImg}/>
                </View>
                    
                <Svg height='1' width={lineWidth}>
                    <Line x1="8" y1="0" x2={lineWidth-28} y2="0" stroke="#e3e3e3" strokeWidth="2" strokeDasharray="2,1"/>
                </Svg> 
                <View style={styles.content_view}>
                    <View style={styles.row_view}>
                        <Text style={styles.name_text}>Remained</Text>
                        <Text style={[styles.data_text,{color:'#4c4c4c'}]}>{remainedData}</Text>
                    </View>
                    <View style={styles.row_view}>
                        <Text style={styles.name_text}>Used</Text>
                        <Text style={styles.data_text}>{usedData}</Text>
                    </View>
                    <View style={styles.row_view}>
                        <Text style={styles.name_text}>Effective Date</Text>
                        <Text style={styles.data_text}>{effDate}</Text>
                    </View>
                    <View style={styles.row_view}>
                        <Text style={styles.name_text}>Expiry Date</Text>
                        <Text style={styles.data_text}>{expDate}</Text>
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
    },
    header_view: {
        flex:1,
        backgroundColor:'#fff',
        height:15,
    },
    content_view: {
        flex:4,
        backgroundColor:'#fff',
        justifyContent: 'space-around',
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name_text: {
        marginLeft: 8,
        color: '#909090',
        fontSize: 12
    },
    data_text: {
        marginRight: 8,
        color: '#909090',
        fontSize: 12
    }
});

export default MyBalanceRow;