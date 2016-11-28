import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import commstyles from '../styles/style';

class SetPass extends Component {
	constructor(props) {
		super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['Password', 'Confirm']),
		}
	}

    _renderRow(rowData, sectionID, rowID) {
        if (rowID==0){
            return (
                <View>
                    <View style={styles.tbl_row}>
                        <Text style={[styles.tbl_row_name,commstyles.row_title_font]}>
                            {rowData}
                        </Text>
                        <TextInput
                            style={[commstyles.row_place_text]} placeholder='Set password' placeholderTextColor='#909090'/>
                    </View>
                    <View style={styles.tbl_separator} />
                </View>
            );
        }else {
            return (
                <View>
                    <View style={styles.tbl_row}>
                        <Text style={[styles.tbl_row_name,commstyles.row_title_font]}>
                            {rowData}
                        </Text>
                        <TextInput
                            style={[commstyles.row_place_text]} placeholder='Confirm password' placeholderTextColor='#909090'/>
                    </View>
                    <View style={styles.tbl_separator} />
                </View>
            );
        }
    }
    //导航条 右侧按钮有个done 但在 app.js中没有侦听事件
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
        backgroundColor: '#F2F3F4'
    },
    tbl_view: {
        marginLeft: 0,
        marginRight: 0,
        marginTop:12,
        backgroundColor:'#fff'
    },
    tbl_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        alignItems: 'center',
        height:40,
    },
    tbl_separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    tbl_row_name: {
        width: 80
    }
});

export default SetPass;
