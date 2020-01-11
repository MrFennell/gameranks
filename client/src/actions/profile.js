import * as apiUtil from '../util/profile';
import { receiveErrors } from './error';

export const LOAD_PROFILE_GAMES = 'LOAD_PROFILE_GAMES';
export const UPDATE_PROFILE_GAME_LIKE = 'UPDATE_PROFILE_GAME_LIKE';
export const UPDATE_PROFILE_GAME_PLAYED = 'UPDATE_PROFILE_GAME_PLAYED';

// export const CLEAR_PROFILE_GAMES = 'CLEAR_PROFILE_GAMES';

const loadProfileGames = games => ({
    type: LOAD_PROFILE_GAMES,
    games
});

const updateProfileGameLike = games => ({
    type: UPDATE_PROFILE_GAME_LIKE,
    games
});

const updateProfileGamePlayed = games => ({
    type: UPDATE_PROFILE_GAME_PLAYED,
    games
});

export const loadGames = games => async dispatch => {

        const response = await apiUtil.loadGames(games);
        const data = await response.json();
        if (response.ok) {
            return dispatch(loadProfileGames(data));
        }
        return dispatch(receiveErrors(data));
}


export const addLike = games => async dispatch => {
    games.likes = true;
    const response = await apiUtil.updateLike(games);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameLike(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeLike = games => async dispatch => {
    games.likes = false;
    const response = await apiUtil.updateLike(games);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameLike(data));
    }
    return dispatch(receiveErrors(data));
}

export const addPlayed = games => async dispatch => {
    games.played = true;
    games.param = 'played';
    const response = await apiUtil.updatePlayed(games);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGamePlayed(data));
    }
    return dispatch(receiveErrors(data));
}

export const removePlayed = games => async dispatch => {
    games.played = false;
    const response = await apiUtil.updatePlayed(games);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGamePlayed(data));
    }
    return dispatch(receiveErrors(data));
}