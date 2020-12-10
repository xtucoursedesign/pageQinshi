import {SAVE_TITLE_INFO} from '../action_types';

export default function(previousState = null, action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case SAVE_TITLE_INFO:
            newState = {
                title: data
            }
            return newState;
        default:
            return previousState;
    } 
}