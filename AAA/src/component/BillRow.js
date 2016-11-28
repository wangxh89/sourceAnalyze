import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

class BillRow extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
        let {dataName,effDate,expDate} = this.props.billData;
		return (
                <View style={styles.tbl_row}>
                    <View style={styles.row_left}>
                        <Text style={styles.txt_left}>{dataName}</Text>
                    </View>

                    <View style={styles.row_right}>
                        <Text style={styles.txt_right_up}>{effDate}</Text>

                        <Text style={styles.txt_right_down}>{expDate}</Text>
                    </View>
                </View>
		);
	}
}

const styles = StyleSheet.create({
    tbl_row: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    row_left: {
        flex:0.5,
        marginLeft:18
    },
    txt_left: {
        color: '#4c4c4c',
        fontSize: 14
    },
    row_right: {
        flex:0.5,
        flexDirection: 'column'
    },
    txt_right_up: {
        marginLeft: 6,
        color: '#909090',
        fontSize: 12
    },
    txt_right_down: {
        marginLeft: 6,
        marginTop:8,
        color: '#909090',
        fontSize: 12
    }
});

export default BillRow;