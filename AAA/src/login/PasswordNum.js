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

import EnterPass from './EnterPass';
import commstyles from '../styles/style';

class PasswordNum extends Component {
	constructor(props) {
		super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['Country/Region', '+86']),
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
                        <View style={[commstyles.table_arrow_row_content]}>
                            <Text style={[commstyles.row_content_font]}>
                                China
                            </Text>
                            <Image source={require('../../img/arrow_right.png')}/>
                        </View>
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
                            style={[commstyles.row_place_text]} placeholder='Mobile number' placeholderTextColor='#909090'/>
                    </View>
                    <View style={styles.tbl_separator} />
                </View>
            );
        }
    }
    //提示输入手机验证码，转到输入验证码界面
    _doNext() {
        Alert.alert(
            'Phone Number Confirmation',
            `We will send a verification code to the
            following number:
            +86 138 0000 0000`,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: this._showEnterPass.bind(this)},
            ]
          );
    }

    _showEnterPass() {
        this.props.navigator.push({
			title: 'AAA',
			component: EnterPass
		})
    }

	render() {
		return (
			<View style={styles.main_view}>
				<Text style={[styles.txt_title,commstyles.txt_title]}>Unable To Log in</Text>

                <View style={styles.tbl_view}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}>
                    </ListView>
                </View>

                <TouchableOpacity onPress={this._doNext.bind(this)}>
                    <View style={[styles.view_next,commstyles.view_button_normal]}>
                        <Text style={commstyles.title_button_normal}>
                            Next
                        </Text>
                    </View>
                </TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    txt_title: {
        marginLeft: 20,
        marginTop:20,
    },
    tbl_view: {
        marginLeft: 25,
        marginRight: 25,
        marginTop:16,
    },
    tbl_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        alignItems: 'center',
        height:35,
    },
    tbl_separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    tbl_row_name: {
        width: 120,
    },
    view_next: {
        marginTop:80,
        marginLeft:26,
        marginRight:26,
    },
    txt_next: {
        color: '#fff',
        fontSize: 18
    }
});

export default PasswordNum;
