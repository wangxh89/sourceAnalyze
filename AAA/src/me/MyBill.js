import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ListView
} from 'react-native';
import BillRow from '../component/BillRow';
import ActionSheet from 'react-native-actionsheet';
const buttons = ['Save', 'WIFI', '3G/4G'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class MyBill extends Component {
	constructor(props) {
		super(props);
        
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([{dataName:'0.09MB',
                                effDate:'2016',
                                expDate:'2017'}]),
		}
	}

    _handlePress(index) {
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.row_view}>
                <BillRow billData={rowData}/>
                <View style={styles.tbl_separator} />  
            </View>
        );
    }

    _showWifi() {
		this.ActionSheet.show();
    }

    _showDate() {
		this.ActionSheet.show();
    }
    
	render() {
		return (
            <View style={styles.main_view}>
                <View style={styles.header_view}>
                <TouchableOpacity onPress={this._showWifi.bind(this)} style={styles.menu_view}>
                    <View style={styles.menu_view}>
                        <Text style={styles.menu_text}>WIFI</Text>
                        <Image source={require('../../img/arrow_down.png')} style={{marginLeft:16}}/>
                    </View>
                </TouchableOpacity>

                <View style={styles.header_separator}/>

                <TouchableOpacity onPress={this._showDate.bind(this)} style={styles.menu_view}>
                    <View style={styles.menu_view}>
                        <Text style={styles.menu_text}>2016-Jun</Text>
                        <Image source={require('../../img/arrow_down.png')} style={{marginLeft:16}}/>
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.tbl_view}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}>
                    </ListView>
                </View>

                <ActionSheet 
                    ref={(o) => this.ActionSheet = o}
                    options={buttons}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this._handlePress.bind(this)}
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: '#fff',
    },    
    header_view: {
        flexDirection: 'row',
        height:47,
        justifyContent: 'center',
        backgroundColor:'red'
    },
    menu_text: {
        color: '#4c4c4c',
        fontSize: 14
    },
    header_separator: {
        height: 47,
        width: 1, 
        backgroundColor: '#f1f1f1',  
    },
    menu_view: {
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        flex: 1,
    },
    tbl_separator: {  
        height: 1,
        backgroundColor: '#CCCCCC',  
    }, 
    tbl_view: {
        flex:1
    },
    row_view: {
        height:64
    }
});

export default MyBill;