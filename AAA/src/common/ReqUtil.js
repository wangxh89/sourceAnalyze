import CacheUtil from './CacheUtil'
import Toast from 'react-native-simple-toast';

const baseUrl = 'http://10.45.4.79:8981/selfservice';
// const baseUrl = 'http://10.45.18.190:8080/AAA_R81_selfservice';

const showLog = __DEV__;

/**
 * @param url 完整路径
 */
const getFetch = (url, cached) => {
  const fetchFunc = () => {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(convertRespToJson)
  };
  return CacheUtil(url, fetchFunc, cached).then(defaultAnalyse);
};

/**
 * @param url 完整路径
 */
const postFetch = url => jsonData => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: jsonData
  }).then(convertRespToJson).then(defaultAnalyse);
};

//拼接参数
const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`//TODO 是否得用encodeURI函数
  }).join('&');
};

/**
 * @param cached 是否优先本地缓存
 * @param path 相对路径
 */
const get = cached => (path, data) => {
  let url = `${baseUrl}${path}`;
  if (data) {
    url.append(`?${getParam(data)}`)
  }
  return loggerWrap(`GET  ${url}`)(() => {
    return getFetch(url, cached);
  });
};

/**
 * @param path 相对路径
 */
export const post = path => data => {
//   var jsonData = JSON.stringify(data);
  var url = baseUrl + path;
  return loggerWrap(`POST  ${url}  ${data}`)(() => {
    return postFetch(url)(data);
  });
};

/**
 * 日志打印
 * @param requestInfo
 */
const loggerWrap = requestInfo => fetchFunc => {
  if (showLog) {
    let startTime = new Date().getTime();//开始请求时间
    return fetchFunc().then(result => {
      console.log(`${requestInfo}  success  result = ${JSON.stringify(result)} cost time = ${new Date().getTime() - startTime}ms`);
      return result;
    }).catch(err => {
      console.warn(`${requestInfo}  ${err}`);
      return Promise.reject(err);
    });
  }
  return fetchFunc();
};

const convertRespToJson = response => {
  return response.json();
};

const defaultAnalyse = response => {
  if (response.ERROR_CODE === '0') {
    return response;
  } else {
    // console.warn(response.msg);
    Toast.show(response.ERROR_MSG);
    throw response;
  }
};

export const getFetchFromCache = get(true);//缓存
export const getFetchNeverCached = get(false);//不缓存