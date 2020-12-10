import {SAVE_FACTORY_INFO} from '../action_types';

export const createFactoryInfoAction = value => {
    return {type: SAVE_FACTORY_INFO, data: value}
}