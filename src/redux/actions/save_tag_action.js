import {SAVE_TAG_INFO} from '../action_types';

export const createTagInfoAction = value => {
    return {type: SAVE_TAG_INFO, data: value}
}