import {SAVE_FACTORY_INFO} from '../action_types';

export default function(previousState = null, action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case SAVE_FACTORY_INFO:
            newState = {
                factories: data
            }
            return newState;
        default:
            return previousState;
    } 
}