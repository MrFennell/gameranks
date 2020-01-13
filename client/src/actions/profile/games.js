import * as apiUtil from 'util/profile/games';
import { receiveErrors } from 'actions/error';

export const LOAD_PROFILE_GAMES = 'LOAD_PROFILE_GAMES';
export const UPDATE_PROFILE_GAME_LIKE = 'UPDATE_PROFILE_GAME_LIKE';
export const UPDATE_PROFILE_GAME_PLAYED = 'UPDATE_PROFILE_GAME_PLAYED';
export const UPDATE_PROFILE_GAME_WANT = 'UPDATE_PROFILE_GAME_WANT';

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

const updateProfileGameWant = games => ({
    type: UPDATE_PROFILE_GAME_WANT,
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


export const addLike = game => async dispatch => {
    game.likes = true;
    game.case = 'likes';
    const response = await apiUtil.updateLike(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameLike(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeLike = game => async dispatch => {
    game.likes = false;
    game.case = 'likes';
    const response = await apiUtil.updateLike(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameLike(data));
    }
    return dispatch(receiveErrors(data));
}

export const addPlayed = game => async dispatch => {
    game.played = true;
    const response = await apiUtil.updatePlayed(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGamePlayed(data));
    }
    return dispatch(receiveErrors(data));
}

export const removePlayed = game => async dispatch => {
    game.played = false;
    const response = await apiUtil.updatePlayed(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGamePlayed(data));
    }
    return dispatch(receiveErrors(data));
}

export const addWant = game => async dispatch => {
    game.want = true;
    const response = await apiUtil.updateWant(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameWant(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeWant = game => async dispatch => {
    game.want = false;
    const response = await apiUtil.updateWant(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameWant(data));
    }
    return dispatch(receiveErrors(data));
}