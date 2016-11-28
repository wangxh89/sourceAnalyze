import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import commstyles from '../styles/style';

let headerImg,linkImg;

class CommonLinkRow extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
        headerImg = this.props.headerImg;
        linkImg = this.props.linkImg;
		return (
                <View style={styles.tbl_row}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={headerImg} style={{marginLeft:10,marginRight:10,opacity:(headerImg ? 1.0 : 0)}}/>
                    <Text style={commstyles.common_row_title}>
                        {this.props.textTitle}
                    </Text>
                    </View>
                    <Image source={linkImg} style={{marginRight:10,opacity:(linkImg ? 1.0 : 0)}}/>
                </View>
		);
	}
}

const styles = StyleSheet.create({
    tbl_row: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
});

export default CommonLinkRow;