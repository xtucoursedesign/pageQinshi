import axios from 'axios';
import qs from 'querystring';
import { message } from 'antd';
import store from '../redux/store.js';
import {deleteUserInfoAction} from '../redux/actions/create_user_action';


// 配置axios 请求/响应拦截器 超时
const myAxios = axios.create({
    // 超过4秒，请求超时
    timeout: 4000,
    // axios默认不带cookie，设置为带cookie
    withCredentials: true
});


// 请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 将token写入参数
    if(config.method.toUpperCase() === "GET"){
        if(store.getState().userInfo.token){
            config.url += "&token=" +  store.getState().userInfo.token;
        }
    }else{
        if(store.getState().userInfo.token){
            config.data.token = store.getState().userInfo.token;
        }
    }
    // 服务器无法处理json数据参数 处理
    config.data = qs.stringify(config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 没有登录/无权限
    if(response.data.status === 401){
        message.warning('身份校验失败，请重新登录！', 1);
        store.dispatch(deleteUserInfoAction);
        // 失败中断promise链
        return new Promise(() => {});
    }else if(response.data.status === 1){ // 发生错误
        message.error(response.data.msg, 1);
        // 失败中断promise链
        return new Promise(() => {});
    }else{
        return response.data;
    }
}, function (error) {
    console.log(error);
    // 失败中断promise链
    return new Promise(() => {});
});


export default myAxios;