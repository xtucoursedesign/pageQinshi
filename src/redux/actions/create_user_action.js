import {CREATE_USER_INFO, DELETE_USER_INFO} from '../action_types.js';

export const createUserInfoAction = value => {
    // 本地存储localstorage.setItem(key, value);
    localStorage.setItem('user', JSON.stringify(value.user));
    localStorage.setItem('token', value.token);
    return {type: CREATE_USER_INFO, data: value};
};

export const deleteUserInfoAction = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return {type: DELETE_USER_INFO, data: {}};
}