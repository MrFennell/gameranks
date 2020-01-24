import * as apiUtil from 'util/profile/games';
import { receiveErrors } from 'actions/error';

export const UPDATE_GAME_RATINGS = 'UPDATE_GAME_RATINGS';

const updateGameRating = game => ({
    type: UPDATE_GAME_RATINGS,
    game
});

export const addRating = game => async dispatch => {
    game.newRating = true;
    console.log(game);
    const response = await apiUtil.updateRating(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameRating(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeRating = game => async dispatch => {
    game.newRating = false;
    const response = await apiUtil.updateRating(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameRating(data));
    }
    return dispatch(receiveErrors(data));
}