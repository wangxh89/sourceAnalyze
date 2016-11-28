import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  AppRegistry,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'; 
 
import Home from './home/Home';
import Package from './package/Package'
import Me from './me/Me'
 
class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'home'
        };
    }
    render() {
        return (
          <TabNavigator>
              <TabNavigator.Item
                title="Home"
                selected={this.state.selectedTab === 'home'}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}
                renderIcon={() => <Image source={require("../img/home.png")} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require("../img/home_high.png")} style={styles.iconStyle}/>}
                onPress={() => this.setState({ selectedTab: 'home' })}>
                <Home {...this.props}/>
              </TabNavigator.Item>
              <TabNavigator.Item
                title="Package"
                selected={this.state.selectedTab === 'package'}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}
                renderIcon={() => <Image source={require("../img/package.png")} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require("../img/package_high.png")} style={styles.iconStyle}/>}
                onPress={() => this.setState({ selectedTab: 'package' })}>
                <Package {...this.props}/>
              </TabNavigator.Item>
              <TabNavigator.Item
                title="Me"
                selected={this.state.selectedTab === 'me'}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}
                renderIcon={() => <Image source={require("../img/me.png")} style={styles.peopleIconStyle}/>}
                renderSelectedIcon={() => <Image source={require("../img/me_high.png")} style={styles.peopleIconStyle}/>}
                onPress={() => this.setState({ selectedTab: 'me' })}>
                <Me {...this.props}/>
              </TabNavigator.Item>
            </TabNavigator>
        );
    }
}
const styles=StyleSheet.create({
   iconStyle:{
       width:21,
       height:21,
   },
   peopleIconStyle: {
       width:20,
       height:23,
   },
   textStyle:{
       color:'#999',
   },
   selectedTextStyle:{
       color:'#32bff4',
   }
});

export default Root;