import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    View,
    Text,
    Image
} from 'react-native';

import { connect } from 'react-redux';

import Login from './login/Login';
import VerifyCode from './login/VerifyCode';
import SetPass from './login/SetPass';
import SvgExample from './component/HomeDataCycle';

//默认路由, 显示登录界面
let defaultRoute = {
  id:'login',
  title: 'AAA',
  component: Login
//   component: SvgExample//Login
};

class AAA extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideNavBar: false
    };

    //对登录状态进行判断，如果检测到已经登录了，则会修改Navigator初始的路由设置，使应用直接显示MainPage。
    if (props.isLoggedIn) {
        defaultRoute = {
            title: 'Root',
            component: Root,
            id: 'root'
        }
    };
  }
  // 卸载时 移除侦听
  componentWillUnmount() {
      this._listeners && this._listeners.forEach(listener => listener.remove());
  }
  //如果是 root页 隐藏导航栏
  _onWillFocus(event) {
        if(event.data.route.id == 'root') {
            this.setState({
                hideNavBar: true,
            });
        } else {
            this.setState({
                hideNavBar: false,
            });
        }
    }

    // 设置 导航 的引用
    _setNavigatorRef(navigator) {
        if (navigator !== this._navigator) {
            this._navigator = navigator;
            if (navigator) {
                //  会在导航切换之前调用，参数为目标路由。   willfocus didFoucs
                this._listeners = [
                    navigator.navigationContext.addListener('willfocus', this._onWillFocus.bind(this)),
                ];
            }
        }
    }
  // 导航  渲染场景  所以可以在组件中 使用 props.navigator   在第一个页面props.navigator.push 跳到第二个页面   返回 props.navigator.pop
  _renderScene(route, navigator) {
      // 最初的 route 就是 上面定义的 defaultRoute
    let Component = route.component;
    // params 就是 push 传过来 push({name:'xx', component: component, params:{id: this.state.id}})    下个页面就可以用this.props.id获取传值
    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  // 渲染 导航 条
  _renderNavBar() {
    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 80, alignItems: 'center', justifyContent: 'center'
      },
      buttonWhite:{
        fontSize: 16, color: 'white', fontWeight: '400'
      },
    }

    var routeMapper = {
        //左侧 返回 按钮  大于0说明可以返回上一级
      LeftButton(route, navigator, index, navState) {
          if(index > 0) {
              return (
                    <TouchableOpacity
                        onPress={() => navigator.pop()}
                        style={styles.button}>
                        <Text style={styles.buttonWhite}>Cancel</Text>
                    </TouchableOpacity>
                );

    /*        if(route.component==VerifyCode){
                return (
                    <TouchableOpacity
                        onPress={() => navigator.pop()}
                        style={styles.button}>
                        <Image source={require('../img/arrow_left.png')}/>
                        <Text style={styles.buttonWhite}>Back</Text>
                    </TouchableOpacity>
                );
            } else if(route.component==SetPass){
                return (
                    <TouchableOpacity
                        onPress={() => navigator.pop()}
                        style={styles.button}>
                        <Text style={styles.buttonWhite}>Cancel</Text>
                    </TouchableOpacity>
                );
            } else{
                return (
                    <TouchableOpacity
                        onPress={() => navigator.pop()}
                        style={styles.button}>
                        <Text style={styles.buttonWhite}>Cancel</Text>
                    </TouchableOpacity>
                );
            }*/
        }else{
            return null;
        }
      },
      RightButton(route, navigator, index, navState) {
        if(route.component==SetPass){    //设置密码界面 右边显示Done
            return (<TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonWhite}>Done</Text>
            </TouchableOpacity>
            );
        }else{
            return null;
        }
      },
      Title(route, navigator, index, navState) {  //标题
        return (
            <View style={styles.title}>
              <Text style={styles.buttonWhite}>{route.title ? route.title : ''}</Text>
            </View>
          );
      }
    }

    if(this.state.hideNavBar){
        return <Text style={{height:0, position:'absolute', top:0}} />;
      }else{
            return (
      <Navigator.NavigationBar
        style={{
          backgroundColor: '#32bff4'
          }}
        routeMapper={routeMapper}
      />
    );
      }

  }

  render() {
    return (
      <Navigator
        ref={this._setNavigatorRef.bind(this)}
        initialRoute={defaultRoute}
        renderScene={this._renderScene}
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : (this.state.hideNavBar ? 0 : 64))}}
        navigationBar={this._renderNavBar()} />
    );
  }
}

const styles = StyleSheet.create({
    row_title_font: {
        fontSize:14,
        color:'#909090'
    },
    row_content_font: {
        fontSize:14,
        color:'#4c4c4c'
    },
    row_tip_font: {
        fontSize:14,
        color:'#909090'
    },
    table_row: {
        height:35,
    },
    view_button_normal: {
        backgroundColor:'#32bff4',
        height:35,
        borderRadius:2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title_button_normal: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    view_button_gray: {
        backgroundColor:'#F1F1F1',
        height:35,
        borderRadius:2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',
    }
});

//todo 将select 改为 mapStateToProps  store改为state  将store中的某些值复制到当前组件的props中
// isLoggedIn这个变量便被复制到当前的Root组件中，在Root内部方法中可以访问。
function mapStateToProps(state){
  return {
    isLoggedIn: state.userStore.isLoggedIn
  }
}

//用connect函数进行绑定，否则store变化，不会反馈到Root组件中
export default connect(mapStateToProps)(AAA);

// AppRegistry.registerComponent('AAA', () => AAA);
