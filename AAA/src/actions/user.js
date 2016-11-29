import {
    NativeModules,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as TYPES from '../common/Types';
import { post } from '../common/ReqUtil';

//1. 先派发logging action  设置 status: 'doing'， 导致login界面显示loading弹窗
//2. 有返回的话， 设置status: 'done'，   导致login界面移去loading弹窗，并跳到主界面
//3. info 修改为 user
export function toLogIn(opt) {
    return (dispatch) => {
        dispatch({ 'type': TYPES.LOGGING });
        post('/Login.do')(opt).then((res) => {
            dispatch({ 'type': TYPES.LOG_IN, 'user': res });
        });
    }
}