import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';

import {connect} from 'react-redux';
import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import * as TYPES from '../common/Types';
import {toLogIn} from '../actions/user';

import Signup from './Signup';
import VerifyCode from './VerifyCode';
import PasswordNum from './PasswordNum';
import Root from '../Root';

import {post} from '../common/ReqUtil';

import commstyles from '../styles/style';

class Login extends Component {
	constructor(props) {
		super(props);
        this.state = {
            username: null,
            password: null,
            action: 'login'
        };
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['Country/Region', '+86','Password','Account Type']),
		}
	}
    //对即将变化的nextProps进行与目前的props进行对比
    shouldComponentUpdate(nextProps, nextState) {
        // 检测到isLoggedIn为true，则执行toMain函数（即跳转到主页中）
        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn===true) {
            this.refs.modal.close();
            this.toMain();
            return false;
        }
        //触发logIn后，会先进入LOGGED_DOING状态，此时说明在登录中。对该状态进行监听，如果为该状态，会将弹窗弹出，提醒为loading态
        if(nextProps.status=='doing') {
            this.refs.modal.open();
            return false;
        }
        // 检测到错误或done关于弹窗
        if(nextProps.status=='error' || nextProps.status=='done'){
            this.refs.modal.close();
            return false;
        }
        return true;
    }

    // navigator to root scene
    toMain(){
        		this.props.navigator.push({
			        title: 'Root',
			        component: Root,
                    id: 'root'
		        })
    }
    // 派发 登录 请求
    handleLogin() {
        if(!this.state.username || !this.state.password){
            console.log('nonono');
            return;
        }

        let username = this.state.username;
        let passwd = this.state.password;
        let action = this.state.action;
        var opt = `username=${username}&password=${passwd}&action=login`;
        //this.props.dispatch(toLogIn(opt));

        this.props.dispatch({ 'type': TYPES.LOGGING });
        setTimeout(()=> {
            this.props.dispatch({ 'type': TYPES.LOG_IN, 'user': null });
        },2000)
    }

    onChangeName(text) {
        this.setState({'username': text});
    }

    onChangePass(text) {
        this.setState({'password': text});
    }

    _renderRow(rowData, sectionID, rowID) {
        if (rowID==0){
            //'Country/Region'
            return (
                <View>
                    <View style={[styles.tbl_row,commstyles.table_row]}>
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
        }else if (rowID==1){
            //'+86'
            return (
                <View>
                    <View style={[styles.tbl_row,commstyles.table_row]}>
                        <Text style={[styles.tbl_row_name,commstyles.row_title_font]}>
                            {rowData}
                        </Text>
                        <TextInput
                            style={[commstyles.row_place_text]} placeholder='Mobile number' placeholderTextColor='#909090'
                            onChangeText={this.onChangeName.bind(this)}/>
                    </View>
                    <View style={styles.tbl_separator} />
                </View>
            );
        }else if (rowID==2){
            // 'Password'
            return (
                <View>
                    <View style={[styles.tbl_row,commstyles.table_row]}>
                        <Text style={[styles.tbl_row_name,commstyles.row_title_font]}>
                            {rowData}
                        </Text>
                        <TextInput
                            style={[commstyles.row_place_text]} placeholder='Enter password' placeholderTextColor='#909090'
                            onChangeText={(text) => this.setState({'password': text})}/>
                    </View>
                    <View style={styles.tbl_separator} />
                </View>
            );
        }else{
            //'Account Type'
            return (
                <View>
                    <View style={[styles.tbl_row,commstyles.table_row]}>
                        <Text style={[styles.tbl_row_name,commstyles.row_title_font]}>
                            {rowData}
                        </Text>
                        <View style={[commstyles.table_arrow_row_content]}>
                            <Text style={[commstyles.row_content_font]}>
                                3G/4G
                            </Text>
                            <Image source={require('../../img/arrow_right.png')}/>
                        </View>
                    </View>
                    <View style={styles.tbl_separator} />
                </View>
            );
        }
    }


    // 打开登录界面
    _openSignUp() {
		this.props.navigator.push({
			title: 'AAA',
			component: Signup
		})
	}
    // 打开忘记密码界面
    _openForgetPass() {
        this.props.navigator.push({
			title: 'AAA',
			component: PasswordNum
		})
    }

	render() {
		return (
			<View style={styles.main_view}>
			     {/*<Text style={styles.txt_title}>Log In By Mobile</Text>*/}

                <View style={styles.tbl_view}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}>
                    </ListView>
                </View>

                <TouchableOpacity onPress={this.handleLogin.bind(this)}>
                    <View style={[styles.view_commit,commstyles.view_button_normal]}>
                        <Text style={commstyles.title_button_normal}>
                            Log In
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._openForgetPass.bind(this)}>
                    <View style={styles.view_forgot_pass}>
                        <Text style={styles.txt_forgot_pass}>
                            Forgot Password?
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._openSignUp.bind(this)}>
                    <View style={[styles.view_sign_up,commstyles.view_button_gray]}>
                        <Text style={commstyles.title_button_gray}>
                            Sign Up
                        </Text>
                    </View>
                </TouchableOpacity>

                <ModalBox ref={"modal"} backdropPressToClose={false}  style={[commstyles.modal,commstyles.justAlign]}
                        animationDuration={10} backdrop={true} backdropOpacity={0}>
                        <Spinner isVisible={true} size={50} type="Arc" color="#FFFFFF"/>
                </ModalBox>
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
        marginTop: 15,
        marginLeft: 20,
        fontSize: 18
    },
    tbl_view: {
        marginLeft: 25,
        marginRight: 25,
        marginTop:40,
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
    view_commit: {
        marginTop:80,
        marginLeft:26,
        marginRight:26,
    },
    view_forgot_pass: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:16
    },
    txt_forgot_pass: {
        color: '#63B8FF',
        textDecorationLine: 'underline'
    },
    view_sign_up: {
        marginTop:80,
        marginLeft:26,
        marginRight:26,
    },
});

//todo 将select 改为 mapStateToProps  store改为state  将store中的某些值复制到当前组件的props中
function mapStateToProps(state){
  return {
    isLoggedIn: state.userStore.isLoggedIn,
    user: state.userStore.user,
    status: state.userStore.status,
  }
}

export default connect(mapStateToProps)(Login);
