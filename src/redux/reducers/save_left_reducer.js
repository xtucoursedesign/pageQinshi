import {SAVE_LEFT_INFO} from '../action_types';

let previous = {
    collapsed: false,
}

export default function(previousState = previous, action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case SAVE_LEFT_INFO:
            newState = {
                collapsed: data
            }
            return newState;
        default:
            return previousState;
    } 
}