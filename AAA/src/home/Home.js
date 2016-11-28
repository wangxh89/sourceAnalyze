/**
 * 只显示一个导航条
 */
import React, { Component } from 'react';
import {
    Platform,
    TouchableOpacity,
    StyleSheet,
    Navigator,
	Text,
    View,
} from 'react-native';

import HomePage from './HomePage';

const defaultRoute = {
  component: HomePage,
  title: 'AAA',
};

class Home extends Component {
  _renderScene(route, navigator) {
    let Component = route.component;
    return (
      <Component {...route.params} navigator={navigator} />
    );
  }

  _renderNavBar() {
    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 80, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 16, color: '#fff', fontWeight: '400'
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
          return null;
      },
      RightButton(route, navigator, index, navState) {
        	return null;
      },
      Title(route, navigator, index, navState) {
		  return (
        	<View style={styles.title}>
              <Text style={styles.buttonText}>{route.title ? route.title : ''}</Text>
            </View>
		  );
      }
    }
    return (
      <Navigator.NavigationBar
        style={{
          backgroundColor: '#32bff4'
          }}
        routeMapper={routeMapper}
      />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={defaultRoute}
        renderScene={this._renderScene}
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 64)}}
        navigationBar={this._renderNavBar()} />
    );
  }
}

const styles = StyleSheet.create({

});

export default Home;
