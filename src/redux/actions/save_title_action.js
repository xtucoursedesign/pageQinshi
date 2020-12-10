import {SAVE_TITLE_INFO} from '../action_types';

export const createTitleInfoAction = value => {
    return {type: SAVE_TITLE_INFO, data: value}
}