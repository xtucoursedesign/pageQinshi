// 此文件将发送请求
import axios from 'axios';
import myAxios from './myAxios.js';
import {BASE_URL} from '../config'


// 登录
export const reqLogin = (method, username, password) => myAxios.post(`${BASE_URL}/UserServlet`, {method, username, password});
// 位置
export const reqLocation = () => myAxios.get(`${BASE_URL}/AddrServlet?method=address`);
// 获取天气信息
export const reqWeather = (city) => axios.get('http://wthrcdn.etouch.cn/weather_mini', {params: {city}});
// 获取所有工厂信息
export const reqFactory = () => myAxios.get(`${BASE_URL}/FactoryServlet?method=getAllFactory`);
// 添加工厂
export const reqAddFactory = (method, bfid, name) => myAxios.post(`${BASE_URL}/FactoryServlet`, {method, bfid, name})
// 删除工厂
export const reqRemoveFactory = (method, bfid) => myAxios.post(`${BASE_URL}/FactoryServlet`, {method, bfid});
// 修改工厂
export const reqUpdateFactory = (method, bfid, name, oldBfid) => myAxios.post(`${BASE_URL}/FactoryServlet`, {method, bfid, name, oldBfid});
// 获取所有用户
export const reqUser = method => myAxios.post(`${BASE_URL}/UserServlet`, {method});
// 更新/添加用户
export const reqAddOrUpdateUser = (data) => myAxios.post(`${BASE_URL}/UserServlet`, data);
// 删除用户
export const reqMoveUser = (method, uid) => myAxios.post(`${BASE_URL}/UserServlet`, {method, uid});
// 零件相关
export const reqPart = data => myAxios.post(`${BASE_URL}/PartServlet`, data);
// 主钢构相关
export const reqMain = data => myAxios.post(`${BASE_URL}/MainServlet`, data);
// 项目相关
export const reqProject = data => myAxios.post(`${BASE_URL}/ProjectServlet`, data);
// 下料相关
export const reqLayoff = data => myAxios.post(`${BASE_URL}/LayoffServlet`, data);
// 二次装配相关
export const reqAssembly = data => myAxios.post(`${BASE_URL}/AssemblyServlet`, data);
// 组装相关
export const reqPreAssembly = data => myAxios.post(`${BASE_URL}/PreassemblyServlet`, data);