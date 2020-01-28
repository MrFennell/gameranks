import * as apiUtil from 'util/profile';
import { receiveErrors } from 'actions/error';

export const LOAD_PROFILE = 'LOAD_PROFILE';
export const LOAD_LIKES = 'LOAD_LIKES';
export const LOAD_OWNED = 'LOAD_OWNED';
export const LOAD_WANT = 'LOAD_WANT';
export const LOAD_RATINGS = 'LOAD_RATINGS';

const loadUserProfile = profile => ({
    type: LOAD_PROFILE,
    profile
});

const loadUserLikes = game => ({
    type: LOAD_LIKES,
    game
});

const loadUserOwned = game => ({
    type: LOAD_OWNED,
    game
});

const loadUserWant = game => ({
    type: LOAD_WANT,
    game
});

const loadUserRatings = game => ({
    type: LOAD_RATINGS,
    game
});


export const loadProfile = profile => async dispatch => {
    
        const response = await apiUtil.loadProfile(profile);
        const data = await response.json();
        if (response.ok) {
            return Promise.all([
                dispatch(loadUserProfile(data)), 
                dispatch(loadUserLikes(data.likes)),
                dispatch(loadUserOwned(data.owned)),
                dispatch(loadUserWant(data.want)),
                dispatch(loadUserRatings(data.ratings)),
            ])
        }
        return dispatch(receiveErrors(data));
}