import React, { Component } from 'react';
import {
    Platform,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    View,
    Text,
    Image,
    SegmentedControlIOS
} from 'react-native';

import AllPackage from './AllPackage';
import commstyles from '../styles/style';

const defaultRoute = {
  component: AllPackage,
  title: 'AllPackage',
};

class Package extends Component {
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
        flex: 1, width: 120, alignItems: 'center', justifyContent: 'center'
      },      
      buttonWhite: {
        fontSize: 16, color: '#fff', fontWeight: '400'
      },
      buttonLeft: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(route.component==AllPackage){
          return null;
        }else{
          return (
                    <TouchableOpacity 
                        onPress={() => navigator.pop()}
                        style={styles.button}>
                        <View style={styles.buttonLeft}>
                          <Image source={require('../../img/arrow_right_white.png')} style={{marginLeft:-20}}/>
                          <Text style={[styles.buttonWhite,commstyles.nav_button_item]}>Package</Text>
                        </View>
                    </TouchableOpacity>
                );
        }
      },
      RightButton(route, navigator, index, navState) {
        	return null;
      },
      Title(route, navigator, index, navState) {
        if(route.component==AllPackage){
          		  return (
        	<View style={styles.title}>
              <SegmentedControlIOS values={['All Package', 'My Package']} momentary={false} selectedIndex={0} tintColor="#fff"
                style={{width:230,marginTop:15,marginBottom:15}}/>
        	</View>
		  );
        }else{
		  return (
        	<View style={styles.title}>
              <Text style={styles.buttonWhite}>{route.title ? route.title : ''}</Text>
        	</View>
		  );
        }

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

export default Package;