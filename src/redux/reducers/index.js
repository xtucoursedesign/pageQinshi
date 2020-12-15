// 此文件用于汇总多个reducer交给stroe
import {combineReducers} from 'redux';
import createUserInfoReducer from './create_user_reducer';
import saveTitleInfoReducer from './save_title_reducer';
import saveFactoryInfoReducer from './save_factory_reducer';
import saveTagInfoReducer from './save_tag_reducer';
import saveLeftInfoReducer from './save_left_reducer';


export default combineReducers({
    userInfo: createUserInfoReducer,
    titleInfo: saveTitleInfoReducer,
    factoryInfo: saveFactoryInfoReducer,
    tagInfo: saveTagInfoReducer,
    leftInfo: saveLeftInfoReducer,
})