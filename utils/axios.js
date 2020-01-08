import axios from 'axios';
import { Message, Loading } from 'element-ui';
//import store from '../store';

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

// 创建axios实例
//注意：在使用时将baseURL设置为 window.serviceApi，
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 100000
});

// request拦截器
service.interceptors.request.use(config => {
  startLoading();
  return config;
}, error => {
  endLoading();
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(function (response) {
  endLoading();
  const res = response.data;
  if (res.status == "1") {//错误信息拦截器
    Message({
      message: (res.message == "" || res.message == null) ? "系统异常！" : res.message,
      type: 'error',
      duration: 4 * 1000
    });
    return response;
  } else {
    return res;
  }
}, function (err) {
  endLoading();
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)';
        break;
      case 401:
        err.message = '未授权，请重新登录(401)';
        break;
      case 403:
        err.message = '拒绝访问(403)';
        break;
      case 404:
        err.message = '请求出错(404)';
        break;
      case 408:
        err.message = '请求超时(408)';
        break;
      case 500:
        err.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        err.message = '网络错误(502)';
        break;
      case 503:
        err.message = '服务不可用(503)';
        break;
      case 504:
        err.message = '网络超时(504)';
        break;
      case 505:
        err.message = 'HTTP版本不受支持(505)';
        break;
      default:
        err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  Message({
    message: err.message,
    type: 'error',
    duration: 4 * 1000
  });
  return Promise.reject(err);
}
)

export default service;
