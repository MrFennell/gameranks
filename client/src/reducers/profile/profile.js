import {
    LOAD_PROFILE
} from 'actions/profile/profile';

export default (state = {}, {type, profile}) => {
    Object.freeze(state);
    switch (type) {
        case LOAD_PROFILE:
            return profile;
        default:
            return state;
    }
};