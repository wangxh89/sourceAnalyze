import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    Image,
    ListView
} from 'react-native';
import AllPackageRow from '../component/AllPackageRow';
import MyPackageRow from '../component/MyPackageRow';

class AllPackage extends Component {
	constructor(props) {
		super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([{balanceName:'ETA_FORMULA',
                                balanceData:'$999.99',
                                balanceContent:'lorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsalorenfdsafdsa'}]),
		}
	}
    
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.row_view}>
                <AllPackageRow balanceData={rowData} navigator={this.props.navigator} />
            </View>
        );
    }

    _renderMyRow(rowData, sectionID, rowID){
        
    }
    
	render() {
		return (
			<View style={styles.main_view}>
                <View style={styles.tbl_view}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}>
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
    }
});

export default AllPackage;