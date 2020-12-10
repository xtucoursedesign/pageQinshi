import {CREATE_USER_INFO, DELETE_USER_INFO} from '../action_types.js';
// 在localstorage中读值
let user = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');
let initState = {
    user: user || '',
    isLogin: user && token ? true : false,
    token: token || ''
}
export default function(previousState = initState, action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case CREATE_USER_INFO:
            newState = {
                user: data.user,
                token: data.token,
                isLogin: true
            }
            return newState;
        case DELETE_USER_INFO:
            newState = {
                user: null,
                token: '',
                isLogin: false
            }
            return newState;
        default:
            return previousState;
    } 
}