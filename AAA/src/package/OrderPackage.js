import React, { Component } from 'react';
import {
	View,
	Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import RCTFrontTextInput from '../native_component/FrontTextInput';
import commstyles from '../styles/style';

class OrderPackage extends Component {
	constructor(props) {
		super(props);
        this.state = {btnSendEnable : true, seconds: 60};
	}

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

    _doSubmit() {
        
    }

    _doSend() {
        this.setState({btnSendEnable: false}); 
        this.interval=setInterval(() => {
                        if(this.state.seconds>0){
                            this.setState({seconds:(this.state.seconds-1)});
                        }else{
                            this.setState({btnSendEnable : true, seconds: 60});
                            this.interval && clearInterval(this.interval);
                        }
                    },1000);
    }
    
	render() {
		return (
			<View style={styles.main_view}>
                <Text style={[styles.verify_title,commstyles.txt_title]}>The verification code has been sent to your cellphone </Text>
                <View style={styles.code_view}>
                    <RCTFrontTextInput style={styles.input_code} placeholder='Enter verification code' placeholderTextColor='#909090'/>
                    <TouchableOpacity onPress={this._doSend.bind(this)} style={{flex:1}}>
                    <View style={[styles.send_view,this.state.btnSendEnable ? styles.send_enable : styles.send_unable]}>
                        <Text style={[styles.send_text,this.state.btnSendEnable ? styles.send_text_enable : styles.send_text_unable]}>Resend{this.state.btnSendEnable ? '' : '('+this.state.seconds+')'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this._doSubmit.bind(this)} activeOpacity={this.state.btnSendEnable ? 0.7 : 0}>
                <View style={[styles.submit_view,commstyles.view_button_normal]}>
                    <Text style={commstyles.title_button_normal}>Submit</Text>
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
    verify_title: {
        marginTop: 16,
        marginLeft: 18,
        marginRight : 18,
    },
    code_view: {
        marginTop: 24.5,
        marginLeft: 18,
        marginRight: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input_code: {
        height: 35,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        marginRight:9,
        flex:2,
        fontSize:14
    },
    send_view: {
        height:35,
        flex: 1,
        borderRadius:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    send_enable: {
        backgroundColor:'#63B8FF',
    },
    send_unable: {
        backgroundColor:'#e3e3e3',
    },
    send_text: {
        fontSize: 14
    },
    send_text_enable: {
        color: '#fff',
    },
    send_text_unable: {
        color: '#909090',
    },
    submit_view: {
        marginTop: 33,
        marginLeft: 18,
        marginRight: 18,
    },
});

export default OrderPackage;