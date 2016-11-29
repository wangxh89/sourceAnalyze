import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
//自定义一个logger中间件 打印当前触发的action以及 state变化,  就不需要使用 redux-logger了   logger(store)(next)(action)
// function(store) {
// 	function(next) {
// 		function(action) {

// 		}
// 	}
// }
const logger = store => next => action => {
        if (typeof action === 'function') console.log('dispatching a function');
        else console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result;
    }
    //中间件
let middlewares = [
    logger,
    thunk
];
// 将中间件应用到redux action过程中
// 1. var middlewareWrapper = applyMiddleware(...middlewares);
// 2. let createAppStore = middlewareWrapper(createStore);
// 3.
let createAppStore = applyMiddleware(...middlewares)(createStore);




//保存登录信息,下次打开应用可以直接跳过登录办面 (将store对象存储到本地,以及从本地恢复数据到store)
export default function configureStore(onComplete: () => void) {
    const store = autoRehydrate()(createAppStore)(reducers); // Rehydrate增强器 生成存储store的dispation persist/REHYDRATE  1\用storage中的数据恢复store  2\state被reducer改变了 他也会用改过的值 替换掉storage中的值
    let opt = {
        storage: AsyncStorage, // AsyncStorage, LocalStorage
        transform: [], //转换器
        whitelist: ['us'], //白名单数组,一旦设置 其他的Key都会忽略
    };
    persistStore(store, opt, onComplete); // 要存储的store , opt,  操作结束后的回调
    return store;
}