import {SAVE_LEFT_INFO} from '../action_types';

export const createLeftInfoAction = value => {
    return {type: SAVE_LEFT_INFO, data: value}
}