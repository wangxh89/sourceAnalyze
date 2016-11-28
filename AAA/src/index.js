import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/index';

//let store = configureStore();  // 这一句应当不需要

import AAA from './app';


export default class App extends Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
			store: configureStore(()=>{this.setState({isLoading: false})})
		}
	}
	render(){
		if(this.state.isLoading){     //这里可以显示加载中的界面(store反序列化完触发上面一句)
			console.log('loading app 这里可以显示加载中的界面');
			return null;
		}
		// Provider组件 让容器组件可以拿到state (尤其是容器组件可能在很深的层级,不需要一级级将state传下去)
		return (
			<Provider store={this.state.store}>
				<AAA />
			</Provider>
		)
	}
}
