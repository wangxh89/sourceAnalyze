import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    Image,
    ListView
} from 'react-native';
import Svg,{
    G,
    Path,
    Line
} from 'react-native-svg';
import MyBalanceRow from '../component/MyBalanceRow';

class MyBalance extends Component {
	constructor(props) {
		super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([{balanceName:'Test(Wi-Fi)',
                                headerImg:require('../../img/balance.png'),
                                balanceData:{remainedData:'0.97MB',usedData:'0MB',effDate:'2016',expDate:'2017'}}]),
		}
	}
    
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.row_view}>
                <MyBalanceRow balanceName={rowData.balanceName} headerImg={rowData.headerImg} balanceData={rowData.balanceData}/>
            </View>
        );
    }
    
	render() {
		return (
			<View style={styles.main_view}>
                <View style={styles.tbl_view}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}>
                    </ListView>
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    tbl_view: {
        flex: 1
    },
    row_view: {
        marginTop: 10,
        marginLeft: 8,
        marginRight: 8,
        height: 160,
    }
});

export default MyBalance;