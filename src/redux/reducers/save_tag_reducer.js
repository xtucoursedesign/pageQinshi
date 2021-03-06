import {SAVE_TAG_INFO} from '../action_types';

let previous = {
    path: [],
}

export default function(previousState = previous, action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case SAVE_TAG_INFO:
            newState = {
                path: data.path
            }
            return newState;
        default:
            return previousState;
    } 
}