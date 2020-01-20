import * as apiUtil from 'util/profile/games';
import { receiveErrors } from 'actions/error';

export const UPDATE_GAME_OWNED = 'UPDATE_GAME_OWNED';

const updateGameOwned = game => ({
    type: UPDATE_GAME_OWNED,
    game
});

export const addOwned = game => async dispatch => {
    game.owned = true;
    const response = await apiUtil.updateOwned(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameOwned(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeOwned = game => async dispatch => {
    game.owned = false;
    const response = await apiUtil.updateOwned(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameOwned(data));
    }
    return dispatch(receiveErrors(data));
}