import * as apiUtil from 'util/profile/games';
import { receiveErrors } from 'actions/error';

export const UPDATE_GAME_WANT = 'UPDATE_GAME_WANT';

const updateGameWant = game => ({
    type: UPDATE_GAME_WANT,
    game
});

export const addWant = game => async dispatch => {
    game.want = true;
    const response = await apiUtil.updateWant(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameWant(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeWant = game => async dispatch => {
    game.want = false;
    const response = await apiUtil.updateWant(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameWant(data));
    }
    return dispatch(receiveErrors(data));
}